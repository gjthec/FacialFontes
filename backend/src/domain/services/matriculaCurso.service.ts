import { QueryTypes, Sequelize } from "sequelize";
import { NotFoundError } from "../../errors/notFound.error";
import TenantConnection from "../entities/tenantConnection.model";

export interface ActiveCourse {
  idCurso: number;
  nome: string;
}

export default class MatriculaCursoService {
  private tenantConnection: TenantConnection;

  constructor(tenantConnection: TenantConnection) {
    this.tenantConnection = tenantConnection;
  }

  private getSequelizeConnection(): Sequelize {
    if (!(this.tenantConnection.connection instanceof Sequelize)) {
      throw new Error("Database connection is not Sequelize-compatible.");
    }

    return this.tenantConnection.connection;
  }

  async getActiveCoursesByMatricula(idMatriculaUsuario: number): Promise<ActiveCourse[]> {
    const sequelize = this.getSequelizeConnection();

    console.info(`[MatriculaCursoService] Validando matrícula: ${idMatriculaUsuario}`);
    const matricula = await sequelize.query<{ id_matricula_usuario: number }>(
      "SELECT id_matricula_usuario FROM matriculas WHERE id_matricula_usuario = :id LIMIT 1",
      {
        replacements: { id: idMatriculaUsuario },
        type: QueryTypes.SELECT,
      }
    );

    if (matricula.length === 0) {
      console.warn(`[MatriculaCursoService] Matrícula não encontrada: ${idMatriculaUsuario}`);
      throw new NotFoundError("Matrícula não encontrada.");
    }

    console.info(`[MatriculaCursoService] Buscando contratos ativos da matrícula: ${idMatriculaUsuario}`);
    const contratosAtivos = await sequelize.query<{ id_contrato: number }>(
      "SELECT id_contrato FROM contratos WHERE id_matricula_usuario = :id AND status = 'ATIVO' AND (data_fim IS NULL OR data_fim >= CURRENT_DATE)",
      {
        replacements: { id: idMatriculaUsuario },
        type: QueryTypes.SELECT,
      }
    );

    if (contratosAtivos.length === 0) {
      console.info(`[MatriculaCursoService] Nenhum contrato ativo para matrícula: ${idMatriculaUsuario}`);
      return [];
    }

    const contratoIds = contratosAtivos.map((contrato) => contrato.id_contrato);

    console.info(`[MatriculaCursoService] Buscando cursos dos contratos ativos: ${contratoIds.join(", ")}`);
    const cursos = await sequelize.query<ActiveCourse>(
      "SELECT c.id_curso AS idCurso, c.nome FROM contrato_cursos cc JOIN cursos c ON c.id_curso = cc.id_curso WHERE cc.id_contrato IN (:contratoIds)",
      {
        replacements: { contratoIds },
        type: QueryTypes.SELECT,
      }
    );

    return cursos;
  }
}
