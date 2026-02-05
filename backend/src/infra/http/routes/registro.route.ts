import { Application, Router } from "express";
import { checkUserAccess } from "../middlewares/checkUserAccess.middleware";
import { getSecurityTenant } from "../middlewares/tenant.middleware";
import validateHeaders from "../validators/index.validator";
import { RegistroController } from "../controllers/registro.controller";
import { createNewRegistroValidator } from "../validators/registro.validator";

export default function defineRoute(app: Application) {
  const controller: RegistroController = new RegistroController();
  const router: Router = Router();

  // Create a new Registro
  router.post(
    "/",
    [getSecurityTenant, ...createNewRegistroValidator, validateHeaders],
    controller.create
  );

  // Retrieve all registros
  router.get("/", [getSecurityTenant, validateHeaders], controller.findAll);

  // Retrieve count registros
  router.get("/count", [getSecurityTenant], controller.getCount);

  // Retrieve a single Registro with id
  router.get("/:id", [getSecurityTenant], controller.findById);

  // Update a Registro with id
  router.put("/:id", [getSecurityTenant], controller.update);

  // Delete a Registro with id
  router.delete("/:id", [getSecurityTenant], controller.delete);

  // Custom get Registro
  router.post("/custom", [getSecurityTenant], controller.customQuery);

  app.use("/api/registro", router);
}
