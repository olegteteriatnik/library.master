import { expect } from '@playwright/test';
import { CreateBookPayload } from '../../api/services/booksApi/interfaces/CreateBookPayload';

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
};

export default {
    createBookPayload,
    expectedCreateBookResponse,
};
