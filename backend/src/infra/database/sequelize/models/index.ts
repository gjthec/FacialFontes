import { ModelStatic, Sequelize } from "sequelize";
import userModel from "./user.model";
import roleModel from "./role.model";
import userRoleModel from "./userRole.model";
import functionSystemModel from "./functionSystem.model";
import functionSystemRoleModel from "./functionSystemRole.model";
import componentStructureModel from "./componentStructure.model";
import componentStructureRoleModel from "./componentStructureRole.model";
import fileModel from "./file.model";
import fieldFileModel from "./fieldFile.model";
import TenantConnection from "../../../../domain/entities/tenantConnection.model";
import verificationEmailModel from "./verificationEmail.model";
import menuModel from "./menu.model";
import menuItemModel from "./menuItem.model";
import menuConfigModel from "./menuConfig.model";
import roleMenuModel from "./roleMenu.model";

import testeModel from "./teste.model";
import registroModel from "./registro.model";
import alunoModel from "./aluno.model";
import relatorioPresencaModel from "./relatorioPresenca.model";
export default async function setModels(tenantConnection: TenantConnection) {
  const sequelizeConnection = tenantConnection.connection;

  if (sequelizeConnection instanceof Sequelize == false) {
    throw new Error(
      "Instance of database connection is incompatible with setModels function on sequelize."
    );
  }

  const user = userModel(sequelizeConnection);
  const role = roleModel(sequelizeConnection);
  const userRole = userRoleModel(sequelizeConnection);
  const functionSystem = functionSystemModel(sequelizeConnection);
  const functionSystemRole = functionSystemRoleModel(sequelizeConnection);
  const componentStructure = componentStructureModel(sequelizeConnection);
  const componentStructureRole =
    componentStructureRoleModel(sequelizeConnection);
  const file = fileModel(sequelizeConnection);
  const fieldFile = fieldFileModel(sequelizeConnection);
  const verificationEmail = verificationEmailModel(sequelizeConnection);
  const menu = menuModel(sequelizeConnection);
  const menuItem = menuItemModel(sequelizeConnection);
  const menuConfig = menuConfigModel(sequelizeConnection);
  const roleMenu = roleMenuModel(sequelizeConnection);

  //Relação de um para um de fieldFile para user com chave em fielFile
  user.hasOne(fieldFile, {
    foreignKey: "user",
    as: "ALIASuserALIASfieldFileALIAS",
  });
  fieldFile.belongsTo(user, {
    foreignKey: "user",
    as: "ALIASuserALIASfieldFileALIAS",
  });

  //Relação de um para muitos de fieldFile para file
  fieldFile.hasMany(file, {
    foreignKey: "fieldFile",
    as: "ALIASfilesALIASfieldFileALIAS",
    onDelete: "CASCADE",
  });

  //Relação de muitos pra muitos de User para Role
  user.belongsToMany(role, {
    through: userRole,
    foreignKey: "userId",
    otherKey: "roleId",
  });
  role.belongsToMany(user, {
    through: userRole,
    foreignKey: "roleId",
    otherKey: "userId",
  });

  //Relação de muitos pra muitos entre Role e FunctionsSystem
  role.belongsToMany(functionSystem, {
    through: functionSystemRole,
    foreignKey: "roleId",
    otherKey: "functionSystemId",
    as: "functionSystem",
  });

  functionSystem.belongsToMany(role, {
    through: functionSystemRole,
    foreignKey: "functionSystemId",
    otherKey: "roleId",
    as: "role",
  });

  //Relação de muitos para muitos entre ComponentStructure e Role
  componentStructure.belongsToMany(role, {
    through: componentStructureRole,
    foreignKey: "componentStructureId",
    otherKey: "roleId",
  });
  role.belongsToMany(componentStructure, {
    through: componentStructureRole,
    foreignKey: "roleId",
    otherKey: "componentStructureId",
  });

  //Relação para o menu
  menu.hasMany(menuItem, { foreignKey: "menuId" });
  menuItem.belongsTo(menu, { foreignKey: "menuId", as: "menu" });

  menuConfig.hasOne(menu, { foreignKey: "menuConfigId" });
  menu.belongsTo(menuConfig, { foreignKey: "menuConfigId", as: "menuConfig" });

  menuItem.hasMany(menuItem, { foreignKey: "subMenuId" });
  menuItem.belongsTo(menuItem, { foreignKey: "subMenuId", as: "subMenu" });

  role.belongsToMany(menu, {
    through: roleMenu,
    as: "menus",
    foreignKey: "roleId",
    otherKey: "menuId",
  });

  menu.belongsToMany(role, {
    through: roleMenu,
    as: "roles",
    foreignKey: "menuId",
    otherKey: "roleId",
  });

  const teste = testeModel(sequelizeConnection);
  const registro = registroModel(sequelizeConnection);
  const aluno = alunoModel(sequelizeConnection);
  const relatorioPresenca = relatorioPresencaModel(sequelizeConnection);

  fieldFile.hasOne(teste, { foreignKey: "foto", as: "ALIASfotoALIASteste" });
  teste.belongsTo(fieldFile, { foreignKey: "foto", as: "ALIASfotoALIASteste" });

  fieldFile.hasOne(registro, {
    foreignKey: "foto",
    as: "ALIASfotoALIASregistro",
  });
  registro.belongsTo(fieldFile, {
    foreignKey: "foto",
    as: "ALIASfotoALIASregistro",
  });

  fieldFile.hasOne(aluno, { foreignKey: "foto", as: "ALIASfotoALIASaluno" });
  aluno.belongsTo(fieldFile, { foreignKey: "foto", as: "ALIASfotoALIASaluno" });

  await sequelizeConnection
    .sync({ alter: true })
    .then(() => {
      console.log("Banco de dados sincronizado");
    })
    .catch((error) => {
      console.log("Erro ao sincronizar o banco de dados");
    });

  const models = new Map<string, any>();

  models.set("User", user);
  models.set("Role", role);
  //Models de controle de acesso as rotas
  models.set("UserRole", userRole);
  models.set("FunctionSystem", functionSystem);
  models.set("FunctionSystemRole", functionSystemRole);
  //Models de controle de acesso a ambiente
  models.set("ComponentStructure", componentStructure);
  models.set("ComponentStructureRole", componentStructureRole);
  models.set("VerificationEmail", verificationEmail);
  //Models de arquivos
  models.set("File", file);
  models.set("FieldFile", fieldFile);
  //Models de menu
  models.set("Menu", menu);
  models.set("MenuItem", menuItem);
  models.set("MenuConfig", menuConfig);
  models.set("RoleMenu", roleMenu);
  //Modelos do projeto
  models.set("Teste", teste);
  models.set("Registro", registro);
  models.set("Aluno", aluno);
  models.set("RelatorioPresenca", relatorioPresenca);

  return models;
}
