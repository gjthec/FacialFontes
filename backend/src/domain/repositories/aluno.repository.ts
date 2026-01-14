import { createDbAdapter } from "../../infra/database/createDb.adapter";
import { IDatabaseAdapter } from "../../infra/database/IDatabase.adapter";
import TenantConnection from "../entities/tenantConnection.model";
import BaseRepository from "./base.repository";
import { Aluno, IAluno } from "../entities/aluno.model";

export default class AlunoRepository extends BaseRepository<IAluno, Aluno> {
  constructor(tenantConnection: TenantConnection) {
    const _adapter: IDatabaseAdapter<IAluno, Aluno> = createDbAdapter<IAluno, Aluno>(
      tenantConnection.models!.get("Aluno"),
      tenantConnection.databaseType,
      tenantConnection.connection,
      Aluno.fromJson
    );

    super(_adapter, tenantConnection);
  }
}
