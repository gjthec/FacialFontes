import { param } from "express-validator";

export const getActiveCoursesByMatriculaValidator = [
  param("idMatriculaUsuario")
    .isInt({ gt: 0 })
    .withMessage("idMatriculaUsuario must be a positive integer"),
];
