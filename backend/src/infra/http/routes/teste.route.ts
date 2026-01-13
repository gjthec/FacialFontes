import { Application, Router } from "express";
import { checkUserAccess } from "../middlewares/checkUserAccess.middleware";
import validateHeaders from "../validators/index.validator";
import { TesteController } from "../controllers/teste.controller";
import { createNewTesteValidator } from "../validators/teste.validator";

export default function defineRoute(app: Application) {
  const controller: TesteController = new TesteController();
  const router: Router = Router();
  // Create a new Teste
  router.post(
    "/",
    [checkUserAccess, ...createNewTesteValidator, validateHeaders],
    controller.create
  );

  // Retrieve all teste
  router.get("/", [checkUserAccess, validateHeaders], controller.findAll);
  // Retrieve cout teste
  router.get("/count", [checkUserAccess], controller.getCount);
  // Retrieve a single Teste with id
  router.get("/:id", [checkUserAccess], controller.findById);
  // Update a Teste with id
  router.put("/:id", [checkUserAccess], controller.update);
  // Delete a Teste with id
  router.delete("/:id", [checkUserAccess], controller.delete);
  // Custom get Teste
  router.post("/custom", [checkUserAccess], controller.customQuery);

  app.use("/api/teste", router);
}
