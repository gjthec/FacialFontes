import { param } from "express-validator";

export const getActiveCoursesByMatriculaValidator = [
  param("idMatriculaUsuario")
    .trim()
    .notEmpty()
    .withMessage("idMatriculaUsuario is required"),
];
