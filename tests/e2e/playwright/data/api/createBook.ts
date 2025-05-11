import { expect } from '@playwright/test';
import { CreateBookPayload } from '../../api/services/booksApi/interfaces/CreateBookPayload';
import { BookType } from '../../api/services/booksApi/interfaces/BookType';

const createBookPayload: CreateBookPayload = {
    title: `API. Create Book Title ${new Date(Date.now()).toISOString()}`,
    author: `API. Create Book Author ${new Date(Date.now()).toISOString()}`,
    year: new Date().getFullYear(),
};

const expectedCreateBookResponse = {
    id: expect.any(Number),
    title: createBookPayload.title,
    author: createBookPayload.author,
    year: createBookPayload.year,
    isAvailable: true,
    type: BookType.printed,
};

export default {
    createBookPayload,
    expectedCreateBookResponse,
};
