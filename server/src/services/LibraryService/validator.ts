import Joi from 'joi';
import { BookType } from '../../interfaces/BookType';

export const createBookRequestSchema = Joi.object({
    title: Joi.string().min(1).required(),
    author: Joi.when('type', { is: BookType.audiobook, then: Joi.string().min(2).optional(), otherwise: Joi.string().min(2).required() }),
    year: Joi.number().integer().min(0).required(),
    isAvailable: Joi.boolean().optional().default(false),
    type: Joi.string().valid(...Object.values(BookType)).optional().default(BookType.printed),
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
    type: Joi.string().valid(...Object.values(BookType)).optional(),
}).or('title', 'author', 'year', 'isAvailable', 'type');

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
