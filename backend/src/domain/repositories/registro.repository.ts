import { createDbAdapter } from "../../infra/database/createDb.adapter";
import { IDatabaseAdapter } from "../../infra/database/IDatabase.adapter";
import TenantConnection from "../entities/tenantConnection.model";
import BaseRepository from "./base.repository";
import { IRegistro, Registro } from "../entities/registro.model";

export default class RegistroRepository extends BaseRepository<
  IRegistro,
  Registro
> {
  constructor(tenantConnection: TenantConnection) {
    const _adapter: IDatabaseAdapter<IRegistro, Registro> = createDbAdapter<
      IRegistro,
      Registro
    >(
      tenantConnection.models!.get("Registro"),
      tenantConnection.databaseType,
      tenantConnection.connection,
      Registro.fromJson
    );

    super(_adapter, tenantConnection);
  }
}
