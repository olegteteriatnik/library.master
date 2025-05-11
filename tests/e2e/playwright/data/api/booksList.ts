import { expect } from '@playwright/test';
import commonHelper from '../../helpers/commonHelper';
import { BooksListPayload } from '../../api/services/booksApi/interfaces/BooksListPayload';
import { BookType } from '../../api/services/booksApi/interfaces/BookType';

const booksListFilters: BooksListPayload = {};

const expectedBookItemStructure = {
    id: expect.any(Number),
    title: expect.any(String),
    author: expect.any(String),
    year: expect.any(Number),
    isAvailable: expect.any(Boolean),
    type: expect.stringMatching(commonHelper.enumToRegex(BookType)),
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
