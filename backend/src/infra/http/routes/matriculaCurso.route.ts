import { Application, Router } from "express";
import { checkUserAccess } from "../middlewares/checkUserAccess.middleware";
import validateHeaders from "../validators/index.validator";
import { MatriculaCursoController } from "../controllers/matriculaCurso.controller";
import { getActiveCoursesByMatriculaValidator } from "../validators/matriculaCurso.validator";

export default function matriculaCursoRoutes(app: Application) {
  const router: Router = Router();
  const controller = new MatriculaCursoController();

  router.get(
    "/:idMatriculaUsuario/cursos-ativos",
    [checkUserAccess, ...getActiveCoursesByMatriculaValidator, validateHeaders],
    controller.getActiveCourses
  );

  app.use("/api/matriculas", router);
}
