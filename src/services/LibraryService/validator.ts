import Joi from 'joi';

export const addBookRequestSchema = Joi.object({
    title: Joi.string().min(1).required(),
    author: Joi.string().min(2).required(),
    year: Joi.number().integer().min(0).required(),
    isAvailable: Joi.boolean().optional().default(false),
});

export const removeBookRequestSchema = Joi.object({
    id: Joi.number().integer().min(1).required(),
});

export const listBooksSchema = Joi.object({
    page: Joi.number().integer().min(1).optional(),
    pageSize: Joi.number().integer().min(1).optional(),
    sortBy: Joi.string().valid('title', 'author', 'year').optional(),
});

export const searchBooksSchema = Joi.object({
    page: Joi.number().integer().min(1).optional().default(1),
    pageSize: Joi.number().integer().min(1).optional().default(10),
    title: Joi.string().min(1).optional(),
    author: Joi.string().min(1).optional(),
    year: Joi.number().integer().min(0).optional(),
    isAvailable: Joi.boolean().optional(),
});

export const checkAvailabilitySchema = Joi.object({
    id: Joi.number().integer().min(1).required(),
});
