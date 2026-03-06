import { Application, Router } from "express";
import { checkUserAccess } from "../middlewares/checkUserAccess.middleware";
import { getDefaultTenant } from "../middlewares/tenant.middleware";
import validateHeaders from "../validators/index.validator";
import { RegistroController } from "../controllers/registro.controller";
import { createNewRegistroValidator } from "../validators/registro.validator";

export default function defineRoute(app: Application) {
  const controller: RegistroController = new RegistroController();
  const router: Router = Router();

  // Create a new Registro
  router.post(
    "/",
    [getDefaultTenant, ...createNewRegistroValidator, validateHeaders],
    controller.create
  );

  // Retrieve all registros
  router.get("/", [getDefaultTenant, validateHeaders], controller.findAll);

  // Retrieve count registros
  router.get("/count", [getDefaultTenant], controller.getCount);

  // Retrieve a single Registro with id
  router.get("/:id", [getDefaultTenant], controller.findById);

  // Update a Registro with id
  router.put("/:id", [getDefaultTenant], controller.update);

  // Delete a Registro with id
  router.delete("/:id", [getDefaultTenant], controller.delete);

  // Custom get Registro
  router.post("/custom", [getDefaultTenant], controller.customQuery);

  app.use("/api/registro", router);
}
