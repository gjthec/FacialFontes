import { check } from 'express-validator';

export const createNewAlunoValidator = [
  check('nome').notEmpty().withMessage('nome is required'),
  check('matricula').notEmpty().withMessage('matricula is required'),
  check('cpf').notEmpty().withMessage('cpf is required'),
  check('email').notEmpty().isEmail().withMessage('email is required'),
];
