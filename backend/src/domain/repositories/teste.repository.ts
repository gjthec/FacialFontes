import { createDbAdapter } from "../../infra/database/createDb.adapter";
import { IDatabaseAdapter } from "../../infra/database/IDatabase.adapter";
import TenantConnection from "../entities/tenantConnection.model";
import BaseRepository from "./base.repository";
import { ITeste, Teste } from "../entities/teste.model"; 

export default class TesteRepository extends BaseRepository<ITeste, Teste>{ 

  constructor(tenantConnection: TenantConnection){ 
    const _adapter : IDatabaseAdapter<ITeste, Teste> = createDbAdapter<ITeste, Teste>(tenantConnection.models!.get("Teste"), tenantConnection.databaseType, tenantConnection.connection, Teste.fromJson);
    super(_adapter, tenantConnection); 
  } 

}
