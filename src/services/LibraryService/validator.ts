import Joi from 'joi';

export const bookSchema = Joi.object({
    title: Joi.string().min(1).required(),
    author: Joi.string().min(2).required(),
    year: Joi.number().integer().min(0).required(),
    isAvailable: Joi.boolean().optional().default(false),
});