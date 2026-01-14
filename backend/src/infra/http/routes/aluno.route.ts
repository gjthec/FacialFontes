import { Application, Router } from "express";
import { checkUserAccess } from "../middlewares/checkUserAccess.middleware";
import validateHeaders from "../validators/index.validator";
import { AlunoController } from "../controllers/aluno.controller";
import { createNewAlunoValidator } from "../validators/aluno.validator";

export default function defineRoute(app: Application) {
  const controller: AlunoController = new AlunoController();
  const router: Router = Router();

  router.post(
    "/",
    [checkUserAccess, ...createNewAlunoValidator, validateHeaders],
    controller.create
  );

  router.get("/", [checkUserAccess, validateHeaders], controller.findAll);
  router.get("/count", [checkUserAccess], controller.getCount);
  router.get("/:id", [checkUserAccess], controller.findById);
  router.put("/:id", [checkUserAccess], controller.update);
  router.delete("/:id", [checkUserAccess], controller.delete);
  router.post("/custom", [checkUserAccess], controller.customQuery);

  app.use("/api/alunos", router);
}
