import { Application, Router } from "express";
import { checkUserAccess } from "../middlewares/checkUserAccess.middleware";
import validateHeaders from "../validators/index.validator";
import { RegistroController } from "../controllers/registro.controller";
import { createNewRegistroValidator } from "../validators/registro.validator";

export default function defineRoute(app: Application) {
  const controller: RegistroController = new RegistroController();
  const router: Router = Router();

  // Create a new Registro
  router.post(
    "/",
    [checkUserAccess, ...createNewRegistroValidator, validateHeaders],
    controller.create
  );

  // Retrieve all registros
  router.get("/", [checkUserAccess, validateHeaders], controller.findAll);

  // Retrieve count registros
  router.get("/count", [checkUserAccess], controller.getCount);

  // Retrieve a single Registro with id
  router.get("/:id", [checkUserAccess], controller.findById);

  // Update a Registro with id
  router.put("/:id", [checkUserAccess], controller.update);

  // Delete a Registro with id
  router.delete("/:id", [checkUserAccess], controller.delete);

  // Custom get Registro
  router.post("/custom", [checkUserAccess], controller.customQuery);

  app.use("/api/registro", router);
}
