import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { UnprocessableEntityError } from '../errors/unprocessableEntityError';
import validatorMiddleware from './validate';
import { check } from 'express-validator';

export const validateMongoID = [
    check('id')
        .optional().isMongoId().withMessage('Invalid mongo Id'),

    check('chatId')
        .optional().isMongoId().withMessage('Invalid mongo Id')

    ,
    validatorMiddleware
]