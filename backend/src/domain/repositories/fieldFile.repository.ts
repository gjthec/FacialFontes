import { createDbAdapter } from "../../infra/database/createDb.adapter";
import { IDatabaseAdapter } from "../../infra/database/IDatabase.adapter";
import {
  IFieldFileDatabaseModel,
  FieldFile,
} from "../entities/fieldFile.model";
import TenantConnection from "../entities/tenantConnection.model";
import BaseRepository from "./base.repository";

export default class FieldFileRepository extends BaseRepository<
  IFieldFileDatabaseModel,
  FieldFile
> {
  constructor(tenantConnection: TenantConnection) {
    const _adapter: IDatabaseAdapter<IFieldFileDatabaseModel, FieldFile> =
      createDbAdapter<IFieldFileDatabaseModel, FieldFile>(
        tenantConnection.models!.get("FieldFile"),
        tenantConnection.databaseType,
        tenantConnection.connection,
        FieldFile.fromJson
      );
    super(_adapter, tenantConnection);
  }

  async upload(fieldFile: FieldFile): Promise<string> {
    console.log(fieldFile);

    if (this.tenantConnection.databaseType === "mongodb") {
      throw new Error("Upload is not supported for MongoDB");
    }

    const normalizeBase64 = (v: any): string => {
      if (!v) return "";
      if (typeof v !== "string") return ""; // se vier {}, já era
      // se vier "data:image/png;base64,AAAA..."
      return v.includes(",") ? v.split(",")[1] : v;
    };

    try {
      let files = fieldFile.files ?? [];
      fieldFile.files = [];

      // cria o FieldFile (pai)
      const data = await this.adapter.create(fieldFile);

      if (files.length) {
        for (let i = 0; i < files.length; i++) {
          files[i].fieldFile = data.id ? data.id : undefined;

          // ✅ converte base64 -> Buffer (bytes de verdade)
          const b64 = normalizeBase64((files[i] as any).dataBlob);
          if (!b64) {
            throw new Error(
              `Arquivo ${files[i].name} veio sem dataBlob/base64 válido.`
            );
          }

          // aqui você garante bytea correto
          (files[i] as any).dataBlob = Buffer.from(b64, "base64");

          // opcional: corrigir size com o tamanho real
          files[i].size = (files[i] as any).dataBlob.length;
        }

        const fileModel = this.tenantConnection.models?.get("File");
        if (fileModel) {
          await fileModel.bulkCreate(files, { validate: true }); // ✅ await
        }
      }

      return data.id ? data.id.toString() : "";
    } catch (error) {
      throw error;
    }
  }

  async findAllFilesById(id: number): Promise<FieldFile> {
    try {
      const fieldFile = await this.adapter.findById(id);

      if (!fieldFile) {
        throw new Error(`FieldFile with id ${id} not found`);
      }

      const fileModel = this.tenantConnection.models?.get("File");

      if (fileModel) {
        const files = await fileModel.findAll({ where: { fieldFile: id } });
        fieldFile.files = files;
      }
      return fieldFile;
    } catch (error) {
      throw error;
    }
  }
}
