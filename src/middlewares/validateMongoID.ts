import { check } from 'express-validator';

import validatorMiddleware from './validate';

const validateMongoID = [
    check('id')
        .optional().isMongoId().withMessage('Invalid mongo Id'),

    check('chatId')
        .optional().isMongoId().withMessage('Invalid mongo Id')

    ,
    validatorMiddleware
];

export default validateMongoID;