import { check } from 'express-validator';

export const createNewRelatorioPresencaValidator = [
  check('courseName').notEmpty().withMessage('courseName is required'),
  check('classDate').notEmpty().withMessage('classDate is required'),
  check('studentName').notEmpty().withMessage('studentName is required'),
];
