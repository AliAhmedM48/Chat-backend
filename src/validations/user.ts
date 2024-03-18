import { Request, Response, NextFunction } from "express";
import validatorMiddleware from "../middlewares/validate";
import BadRequestError from "../errors/badRequestError";

export const validateUpdateRequest = [
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { firstName, lastName, email, password, avatar } = req.body;

        //#region request validation
        const presentParams = [];

        firstName && presentParams.push('firstName');
        lastName && presentParams.push('lastName');
        email && presentParams.push('email');
        password && presentParams.push('password');
        avatar && presentParams.push('avatar');
        console.log(presentParams.length);

        if (presentParams.length < 1) {
            const errorMessage = 'At least one parameter from firstName, lastName, email, password, avatar must be present in the request body for update.';
            return next(new BadRequestError(errorMessage));
        }
        next()
        //#endregion

    },
    validatorMiddleware
];