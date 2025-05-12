import { expect } from '@playwright/test';
import { BookPrototype } from '../../prototypes/BookPrototype';
import { BookType } from '../../api/services/booksApi/interfaces/BookType';

const bookData = {
    title: 'API. Create Book Title',
    author: 'API. Create Book Author',
};

const createBookPayload = new BookPrototype(bookData);

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
