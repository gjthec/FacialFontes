import { Application } from "express";
import userRoutes from "./user.route";
import tenantRoutes from "./tenant.route";
import roleRoutes from "./role.route";
import databaseCredentialRoutes from "./databaseCredential.route";
import databasePermissionRoutes from "./databasePermission.route";
import tenantDirectoryRoutes from "./tenantDirectory.route";
import applicationRoutes from "./application.route";
import fileRoutes from "./file.route";
import fieldFileRoutes from "./fieldFile.route";
import authenticationRoutes from "./authentication.route";
import dashboardRoutes from "./dashboard.route";
import consultaRoutes from "./consulta.route";
import menuRoutes from "./menu.route";
import testeRoutes from "./teste.route";
import registroRoutes from "./registro.route";
import alunoRoutes from "./aluno.route";
import relatorioPresencaRoutes from "./relatorioPresenca.route";
/**
 * Define as rotas da aplicação
 * @param app Instância do aplicação Express
 */
export function setRoutes(app: Application) {
  roleRoutes(app);
  userRoutes(app);
  databaseCredentialRoutes(app);
  app;
  tenantRoutes(app);
  databasePermissionRoutes(app);
  tenantDirectoryRoutes(app);
  applicationRoutes(app);
  consultaRoutes(app);
  fileRoutes(app);
  fieldFileRoutes(app);
  authenticationRoutes(app);
  dashboardRoutes(app);
  menuRoutes(app);

  testeRoutes(app);
  registroRoutes(app);
  alunoRoutes(app);
  relatorioPresencaRoutes(app);
}
