import { check, query } from "express-validator";

export const createNewRegistroValidator = [
  check("cursoId").notEmpty().withMessage("cursoId is required"),
  check("matricula").notEmpty().withMessage("matricula is required"),

  // foto (pictureLocation) – se você salva como objeto/json
  check("foto").notEmpty().withMessage("foto is required"),
];

export const findAllRegistroValidator = [
  query("page")
    .notEmpty()
    .isNumeric()
    .withMessage("Only digits allowed in title page"),
  query("limit")
    .optional()
    .isNumeric()
    .withMessage("Only digits allowed in title limit"),
];
