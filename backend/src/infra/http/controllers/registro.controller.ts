import { NextFunction, Request, Response } from "express";
import { BaseController } from "./base.controller";
import { NotFoundError } from "../../../errors/notFound.error";
import { Registro, IRegistro } from "../../../domain/entities/registro.model";
import RegistroRepository from "../../../domain/repositories/registro.repository";
import TenantConnection from "../../../domain/entities/tenantConnection.model";
import { ValidationError } from "sequelize";
import AlunoRepository from "../../../domain/repositories/aluno.repository";
import RelatorioPresencaRepository from "../../../domain/repositories/relatorioPresenca.repository";

export class RegistroController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.body.tenantConnection == undefined) {
        throw new NotFoundError("Não foi definido tenant para uso.");
      }

      const registroRepository: RegistroRepository = new RegistroRepository(
        req.body.tenantConnection as TenantConnection
      );

      const registro = await registroRepository.create(req.body);

      const alunoRepository: AlunoRepository = new AlunoRepository(
        req.body.tenantConnection as TenantConnection
      );

      const alunoId = req.body.alunoId;
      const aluno = alunoId
        ? await alunoRepository.findById(Number(alunoId))
        : req.body.matricula
        ? await alunoRepository.findOne({ matricula: req.body.matricula })
        : null;

      const relatorioRepository: RelatorioPresencaRepository =
        new RelatorioPresencaRepository(
          req.body.tenantConnection as TenantConnection
        );

      await relatorioRepository.create({
        courseName: req.body.cursoId ?? "Curso não informado",
        classDate: new Date().toISOString().split("T")[0],
        studentId: aluno?.id != null ? String(aluno.id) : undefined,
        studentName: aluno?.nome ?? "Aluno não informado",
        matricula: aluno?.matricula ?? req.body.matricula,
        status: "Presente",
        checkInMethod: "Registro",
      });

      res.status(201).json(registro);
    } catch (error) {
      if (error instanceof ValidationError) {
        const validationMessages = error.errors.map((err) => err.message);
        return res.status(400).json({
          error: "Erro de validação",
          details: validationMessages,
        });
      }
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.body.tenantConnection == undefined) {
        throw new NotFoundError("Não foi definido tenant para uso.");
      }

      const registroRepository: RegistroRepository = new RegistroRepository(
        req.body.tenantConnection as TenantConnection
      );

      const baseController: BaseController<IRegistro, Registro> =
        new BaseController(registroRepository, "registro");

      baseController.findAll(req, res, next);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.body.tenantConnection == undefined) {
        throw new NotFoundError("Não foi definido tenant para uso.");
      }

      const registroRepository: RegistroRepository = new RegistroRepository(
        req.body.tenantConnection as TenantConnection
      );

      const baseController: BaseController<IRegistro, Registro> =
        new BaseController(registroRepository, "registro");

      baseController.findById(req, res, next);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.body.tenantConnection == undefined) {
        throw new NotFoundError("Não foi definido tenant para uso.");
      }

      const registroRepository: RegistroRepository = new RegistroRepository(
        req.body.tenantConnection as TenantConnection
      );

      const baseController: BaseController<IRegistro, Registro> =
        new BaseController(registroRepository, "registro");

      baseController.update(req, res, next);
    } catch (error) {
      next(error);
    }
  }

  async getCount(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.body.tenantConnection == undefined) {
        throw new NotFoundError("Não foi definido tenant para uso.");
      }

      const registroRepository: RegistroRepository = new RegistroRepository(
        req.body.tenantConnection as TenantConnection
      );

      const baseController: BaseController<IRegistro, Registro> =
        new BaseController(registroRepository, "registro");

      baseController.getCount(req, res, next);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.body.tenantConnection == undefined) {
        throw new NotFoundError("Não foi definido tenant para uso.");
      }

      const registroRepository: RegistroRepository = new RegistroRepository(
        req.body.tenantConnection as TenantConnection
      );

      const baseController: BaseController<IRegistro, Registro> =
        new BaseController(registroRepository, "registro");

      baseController.delete(req, res, next);
    } catch (error) {
      next(error);
    }
  }

  async customQuery(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.body.tenantConnection == undefined) {
        throw new NotFoundError("Não foi definido tenant para uso.");
      }

      const registroRepository: RegistroRepository = new RegistroRepository(
        req.body.tenantConnection as TenantConnection
      );

      const baseController: BaseController<IRegistro, Registro> =
        new BaseController(registroRepository, "registro");

      baseController.findCustom(req, res, next);
    } catch (error) {
      next(error);
    }
  }
}
