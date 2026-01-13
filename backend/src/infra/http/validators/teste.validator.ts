import { check, query } from 'express-validator'; 

export const createNewTesteValidator = [ 
    check('nome').notEmpty().withMessage('nome is required'), 
    check('tipoPessoa').notEmpty().withMessage('tipoPessoa is required'), 
  ]; 

export const findAllTesteValidator = [ 
  query('page').notEmpty().isNumeric().withMessage('Only digits allowed in title page'), 
  query('limit').optional().isNumeric().withMessage('Only digits allowed in title limit') 
  ]; 
