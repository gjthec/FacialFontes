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

  private async matriculaExists(
    idMatriculaUsuario: number | string,
    sequelize: Sequelize
  ): Promise<boolean> {
    try {
      const matricula = await sequelize.query<{ id_matricula_usuario: number }>(
        "SELECT id_matricula_usuario FROM matriculas WHERE id_matricula_usuario = :id LIMIT 1",
        {
          replacements: { id: idMatriculaUsuario },
          type: QueryTypes.SELECT,
        }
      );

      return matricula.length > 0;
    } catch (error: any) {
      if (error?.name !== "SequelizeDatabaseError" || error?.original?.code !== "42P01") {
        throw error;
      }
    }

    const matriculaFallback = await sequelize.query<{ matricula: string }>(
      "SELECT matricula FROM alunos WHERE matricula = :id LIMIT 1",
      {
        replacements: { id: idMatriculaUsuario },
        type: QueryTypes.SELECT,
      }
    );

    return matriculaFallback.length > 0;
  }

  private async findActiveContratoIds(
    idMatriculaUsuario: number | string,
    sequelize: Sequelize
  ): Promise<number[]> {
    const contratosAtivos = await sequelize.query<{ id_contrato: number }>(
      "SELECT id_contrato FROM contratos WHERE id_matricula_usuario = :id AND status = 'ATIVO' AND (data_fim IS NULL OR data_fim >= CURRENT_DATE)",
      {
        replacements: { id: idMatriculaUsuario },
        type: QueryTypes.SELECT,
      }
    );

    return contratosAtivos.map((contrato) => contrato.id_contrato);
  }

  private async findCursosByContratos(
    contratoIds: number[],
    sequelize: Sequelize
  ): Promise<ActiveCourse[]> {
    if (contratoIds.length === 0) {
      return [];
    }

    return sequelize.query<ActiveCourse>(
      "SELECT c.id_curso AS idCurso, c.nome FROM contrato_cursos cc JOIN cursos c ON c.id_curso = cc.id_curso WHERE cc.id_contrato IN (:contratoIds)",
      {
        replacements: { contratoIds },
        type: QueryTypes.SELECT,
      }
    );
  }

  async getActiveCoursesByMatricula(
    idMatriculaUsuario: number | string
  ): Promise<ActiveCourse[]> {
    const sequelize = this.getSequelizeConnection();

    console.info(`[MatriculaCursoService] Validando matrícula: ${idMatriculaUsuario}`);
    const matriculaExiste = await this.matriculaExists(idMatriculaUsuario, sequelize);

    if (!matriculaExiste) {
      console.warn(`[MatriculaCursoService] Matrícula não encontrada: ${idMatriculaUsuario}`);
      throw new NotFoundError("Matrícula não encontrada.");
    }

    console.info(`[MatriculaCursoService] Buscando contratos ativos da matrícula: ${idMatriculaUsuario}`);
    const contratoIds = await this.findActiveContratoIds(idMatriculaUsuario, sequelize);

    if (contratoIds.length === 0) {
      console.info(`[MatriculaCursoService] Nenhum contrato ativo para matrícula: ${idMatriculaUsuario}`);
      return [];
    }

    console.info(`[MatriculaCursoService] Buscando cursos dos contratos ativos: ${contratoIds.join(", ")}`);
    return this.findCursosByContratos(contratoIds, sequelize);
  }
}
