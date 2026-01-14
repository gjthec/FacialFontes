import { createDbAdapter } from "../../infra/database/createDb.adapter";
import { IDatabaseAdapter } from "../../infra/database/IDatabase.adapter";
import TenantConnection from "../entities/tenantConnection.model";
import BaseRepository from "./base.repository";
import {
  IRelatorioPresenca,
  RelatorioPresenca,
} from "../entities/relatorioPresenca.model";

export default class RelatorioPresencaRepository extends BaseRepository<
  IRelatorioPresenca,
  RelatorioPresenca
> {
  constructor(tenantConnection: TenantConnection) {
    const _adapter: IDatabaseAdapter<IRelatorioPresenca, RelatorioPresenca> =
      createDbAdapter<IRelatorioPresenca, RelatorioPresenca>(
        tenantConnection.models!.get("RelatorioPresenca"),
        tenantConnection.databaseType,
        tenantConnection.connection,
        RelatorioPresenca.fromJson
      );

    super(_adapter, tenantConnection);
  }
}
