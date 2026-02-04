import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../../../errors/notFound.error";
import TenantConnection from "../../../domain/entities/tenantConnection.model";
import MatriculaCursoService from "../../../domain/services/matriculaCurso.service";

export class MatriculaCursoController {
  async getActiveCourses(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.body.tenantConnection == undefined) {
        throw new NotFoundError("Não foi definido tenant para uso.");
      }

      const idMatriculaUsuario = Number(req.params.idMatriculaUsuario);
      const matriculaCursoService = new MatriculaCursoService(
        req.body.tenantConnection as TenantConnection
      );

      const cursos = await matriculaCursoService.getActiveCoursesByMatricula(
        idMatriculaUsuario
      );

      return res.status(200).json({
        idMatriculaUsuario,
        cursos,
      });
    } catch (error) {
      console.error("[MatriculaCursoController] Erro ao buscar cursos ativos", error);
      next(error);
    }
  }
}
