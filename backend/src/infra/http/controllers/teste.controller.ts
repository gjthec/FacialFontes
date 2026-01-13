import { NextFunction, Request, Response } from "express";
import { BaseController } from "./base.controller";
import { NotFoundError } from "../../../errors/notFound.error";
import { Teste, ITeste } from "../../../domain/entities/teste.model";
import TesteRepository from "../../../domain/repositories/teste.repository";
import TenantConnection from "../../../domain/entities/tenantConnection.model";
import { ValidationError } from "sequelize";

export class TesteController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.body.tenantConnection == undefined) {
        throw new NotFoundError("Não foi definido tenant para uso.");
      }
      const testeRepository: TesteRepository = new TesteRepository(
        req.body.tenantConnection as TenantConnection
      );
      const baseController: BaseController<ITeste, Teste> = new BaseController(
        testeRepository,
        "teste"
      );

      baseController.create(req, res, next);
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
      const testeRepository: TesteRepository = new TesteRepository(
        req.body.tenantConnection as TenantConnection
      );
      const baseController: BaseController<ITeste, Teste> = new BaseController(
        testeRepository,
        "teste"
      );

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
      const testeRepository: TesteRepository = new TesteRepository(
        req.body.tenantConnection as TenantConnection
      );
      const baseController: BaseController<ITeste, Teste> = new BaseController(
        testeRepository,
        "teste"
      );

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
      const testeRepository: TesteRepository = new TesteRepository(
        req.body.tenantConnection as TenantConnection
      );
      const baseController: BaseController<ITeste, Teste> = new BaseController(
        testeRepository,
        "teste"
      );

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
      const testeRepository: TesteRepository = new TesteRepository(
        req.body.tenantConnection as TenantConnection
      );
      const baseController: BaseController<ITeste, Teste> = new BaseController(
        testeRepository,
        "teste"
      );

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
      const testeRepository: TesteRepository = new TesteRepository(
        req.body.tenantConnection as TenantConnection
      );
      const baseController: BaseController<ITeste, Teste> = new BaseController(
        testeRepository,
        "teste"
      );

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
      const testeRepository: TesteRepository = new TesteRepository(
        req.body.tenantConnection as TenantConnection
      );
      const baseController: BaseController<ITeste, Teste> = new BaseController(
        testeRepository,
        "teste"
      );

      baseController.findCustom(req, res, next);
    } catch (error) {
      next(error);
    }
  }
}
