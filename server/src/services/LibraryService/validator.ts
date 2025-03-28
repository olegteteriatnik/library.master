import Joi from 'joi';

export const createBookRequestSchema = Joi.object({
    title: Joi.string().min(1).required(),
    author: Joi.string().min(2).required(),
    year: Joi.number().integer().min(0).required(),
    isAvailable: Joi.boolean().optional().default(false),
});

export const bookIdSchema = Joi.object({
    id: Joi.number().integer().min(1).required(),
});

export const updateBookRequestSchema = Joi.object({
    id: Joi.number().integer().min(1).required(),
    title: Joi.string().min(1).optional(),
    author: Joi.string().min(2).optional(),
    year: Joi.number().integer().min(0).optional(),
    isAvailable: Joi.boolean().optional(),
}).or('title', 'author', 'year', 'isAvailable');

export const deleteBookRequestSchema = Joi.object({
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
