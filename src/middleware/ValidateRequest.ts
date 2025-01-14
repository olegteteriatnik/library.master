import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

export const validateRequest = (schema: ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const dataToValidate = req.method === 'GET' ? req.query : req.body;
        const { error } = schema.validate(dataToValidate, { abortEarly: false });
        if (error) {
            res.status(400).json({
                message: 'Validation error',
                errors: error.details.map((detail) => detail.message),
            });
            return;
        }
        next();
    };
};
