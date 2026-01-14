import { NextFunction, Request, Response } from "express";
import { BaseController } from "./base.controller";
import { NotFoundError } from "../../../errors/notFound.error";
import {
  IRelatorioPresenca,
  RelatorioPresenca,
} from "../../../domain/entities/relatorioPresenca.model";
import RelatorioPresencaRepository from "../../../domain/repositories/relatorioPresenca.repository";
import TenantConnection from "../../../domain/entities/tenantConnection.model";
import { ValidationError } from "sequelize";

export class RelatorioPresencaController {
  private buildSeedData() {
    const today = new Date();
    const todayIso = today.toISOString().split("T")[0];
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const yesterdayIso = yesterday.toISOString().split("T")[0];

    return [
      {
        courseName: "Engenharia de Software - Turma A",
        classDate: todayIso,
        studentId: "s1",
        studentName: "Mariana Costa",
        matricula: "2024001",
        status: "Presente",
        checkInMethod: "Facial",
      },
      {
        courseName: "Engenharia de Software - Turma A",
        classDate: todayIso,
        studentId: "s2",
        studentName: "João Henrique",
        matricula: "2024002",
        status: "Ausente",
        checkInMethod: "Manual",
      },
      {
        courseName: "Física 1 - Turma B",
        classDate: yesterdayIso,
        studentId: "s3",
        studentName: "Carla Menezes",
        matricula: "2024101",
        status: "Presente",
        checkInMethod: "QRCode",
      },
      {
        courseName: "Cálculo - Turma C",
        classDate: yesterdayIso,
        studentId: "s4",
        studentName: "Rafael Lima",
        matricula: "2024204",
        status: "Presente",
        checkInMethod: "Facial",
      },
    ];
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.body.tenantConnection == undefined) {
        throw new NotFoundError("Não foi definido tenant para uso.");
      }
      const relatorioRepository: RelatorioPresencaRepository =
        new RelatorioPresencaRepository(
          req.body.tenantConnection as TenantConnection
        );
      const baseController: BaseController<IRelatorioPresenca, RelatorioPresenca> =
        new BaseController(relatorioRepository, "relatorioPresenca");

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
      const relatorioRepository: RelatorioPresencaRepository =
        new RelatorioPresencaRepository(
          req.body.tenantConnection as TenantConnection
        );
      const baseController: BaseController<IRelatorioPresenca, RelatorioPresenca> =
        new BaseController(relatorioRepository, "relatorioPresenca");

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
      const relatorioRepository: RelatorioPresencaRepository =
        new RelatorioPresencaRepository(
          req.body.tenantConnection as TenantConnection
        );
      const baseController: BaseController<IRelatorioPresenca, RelatorioPresenca> =
        new BaseController(relatorioRepository, "relatorioPresenca");

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
      const relatorioRepository: RelatorioPresencaRepository =
        new RelatorioPresencaRepository(
          req.body.tenantConnection as TenantConnection
        );
      const baseController: BaseController<IRelatorioPresenca, RelatorioPresenca> =
        new BaseController(relatorioRepository, "relatorioPresenca");

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
      const relatorioRepository: RelatorioPresencaRepository =
        new RelatorioPresencaRepository(
          req.body.tenantConnection as TenantConnection
        );
      const baseController: BaseController<IRelatorioPresenca, RelatorioPresenca> =
        new BaseController(relatorioRepository, "relatorioPresenca");

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
      const relatorioRepository: RelatorioPresencaRepository =
        new RelatorioPresencaRepository(
          req.body.tenantConnection as TenantConnection
        );
      const baseController: BaseController<IRelatorioPresenca, RelatorioPresenca> =
        new BaseController(relatorioRepository, "relatorioPresenca");

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
      const relatorioRepository: RelatorioPresencaRepository =
        new RelatorioPresencaRepository(
          req.body.tenantConnection as TenantConnection
        );
      const baseController: BaseController<IRelatorioPresenca, RelatorioPresenca> =
        new BaseController(relatorioRepository, "relatorioPresenca");

      baseController.findCustom(req, res, next);
    } catch (error) {
      next(error);
    }
  }

  async validateIdentity(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.body.tenantConnection == undefined) {
        throw new NotFoundError("Não foi definido tenant para uso.");
      }

      const matched = Math.random() < 0.88;
      const score = matched
        ? 0.84 + Math.random() * 0.14
        : 0.2 + Math.random() * 0.4;

      return res.status(200).json({
        matched,
        score: Number(score.toFixed(2)),
        checkedAtIso: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }

  async seed(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.body.tenantConnection == undefined) {
        throw new NotFoundError("Não foi definido tenant para uso.");
      }

      const relatorioRepository: RelatorioPresencaRepository =
        new RelatorioPresencaRepository(
          req.body.tenantConnection as TenantConnection
        );

      const seedData = this.buildSeedData();
      const created = [];
      for (const payload of seedData) {
        created.push(await relatorioRepository.create(payload));
      }

      return res.status(201).json(created);
    } catch (error) {
      next(error);
    }
  }
}
