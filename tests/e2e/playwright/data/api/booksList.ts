import { expect } from '@playwright/test';
import { BooksListPayload } from '../../api/services/booksApi/interfaces/BooksListPayload';

const booksListFilters: BooksListPayload = {};

const expectedBookItemStructure = {
    id: expect.any(Number),
    title: expect.any(String),
    author: expect.any(String),
    year: expect.any(Number),
    isAvailable: expect.any(Boolean),
};

const expectedBooksListResult = {
    total: expect.any(Number),
    currentPage: expect.any(Number),
    items: expect.arrayContaining([expect.objectContaining(expectedBookItemStructure)]),
};

export default {
    booksListFilters,
    expectedBooksListResult,
};
