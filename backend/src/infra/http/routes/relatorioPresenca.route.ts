import { Application, Router } from "express";
import { checkUserAccess } from "../middlewares/checkUserAccess.middleware";
import validateHeaders from "../validators/index.validator";
import { RelatorioPresencaController } from "../controllers/relatorioPresenca.controller";
import { createNewRelatorioPresencaValidator } from "../validators/relatorioPresenca.validator";

export default function defineRoute(app: Application) {
  const controller: RelatorioPresencaController = new RelatorioPresencaController();
  const router: Router = Router();

  router.post(
    "/",
    [checkUserAccess, ...createNewRelatorioPresencaValidator, validateHeaders],
    controller.create
  );

  router.get("/", [checkUserAccess, validateHeaders], controller.findAll);
  router.get("/count", [checkUserAccess], controller.getCount);
  router.get("/:id", [checkUserAccess], controller.findById);
  router.put("/:id", [checkUserAccess], controller.update);
  router.delete("/:id", [checkUserAccess], controller.delete);
  router.post("/custom", [checkUserAccess], controller.customQuery);
  router.post("/:id/validate", [checkUserAccess], controller.validateIdentity);

  app.use("/api/relatorio-presenca", router);
}
