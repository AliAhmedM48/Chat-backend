<<<<<<< Updated upstream
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

export function validateMongoID(req: Request, res: Response, next: NextFunction): void {
    const { id } = req.params;
=======
import { check } from 'express-validator';

import validatorMiddleware from './validate';

const validateMongoID = [
    check('id')
        .optional().isMongoId().withMessage('Invalid mongo Id'),
>>>>>>> Stashed changes

    if (!mongoose.Types.ObjectId.isValid(id)) {

<<<<<<< Updated upstream
        res.status(400).json({ message: 'Invalid ID' });
        return;
    }

    next();
}
=======
    ,
    validatorMiddleware
];

export default validateMongoID;
>>>>>>> Stashed changes
