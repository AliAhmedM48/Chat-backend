import { check } from 'express-validator';

import validatorMiddleware from './validate';

const validateMongoID = [
    check('id')
        .optional().isMongoId().withMessage('Invalid mongo Id'),

    if (!mongoose.Types.ObjectId.isValid(id)) {

    ,
    validatorMiddleware
];

    export default validateMongoID;
