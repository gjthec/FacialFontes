import { createDbAdapter } from "../../infra/database/createDb.adapter";
import { IDatabaseAdapter } from "../../infra/database/IDatabase.adapter";
import TenantConnection from "../entities/tenantConnection.model";
import BaseRepository from "./base.repository";
import { File, IFileDatabaseModel } from "../entities/file.model";

export default class FileRepository extends BaseRepository<
  IFileDatabaseModel,
  File
> {
  private conn: any;

  constructor(tenantConnection: TenantConnection) {
    const _adapter: IDatabaseAdapter<IFileDatabaseModel, File> =
      createDbAdapter<IFileDatabaseModel, File>(
        tenantConnection.models!.get("File"),
        tenantConnection.databaseType,
        tenantConnection.connection,
        File.fromJson
      );

    super(_adapter, tenantConnection);

    this.conn = tenantConnection.connection; // <- guarda só a conexão
  }

  async findDataUrlByFieldFileId(fieldFileId: number): Promise<string | null> {
    const sql = `
    SELECT
      'data:image/' ||
      CASE
        WHEN lower("extension") = 'jpg' THEN 'jpeg'
        WHEN "extension" IS NULL OR "extension" = '' THEN 'png'
        ELSE lower("extension")
      END
      || ';base64,' || encode("dataBlob", 'base64') AS "dataUrl"
    FROM public."Files"
    WHERE "fieldFile" = :id
    ORDER BY "createdAt" DESC
    LIMIT 1;
  `;

    const result = await this.conn.query(sql, {
      replacements: { id: fieldFileId },
    });
    const rows = Array.isArray(result) ? result[0] : result;

    return rows?.[0]?.dataUrl ?? null;
  }
}
