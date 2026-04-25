import { test, expect } from '@playwright/test';
import commonHelper from '../../helpers/commonHelper';
import { LibraryMasterApi } from '../../api/libraryMasterApi';
import { BookEntity } from '../../api/services/booksApi/interfaces/BookEntity';
import data from '../../data/api/getBook';

const libraryMasterApi = new LibraryMasterApi();
const { createBookPayload, generateExpectedGetBookResponse } = data;

let userAccessToken: string;
let book: BookEntity;

test.describe('Book entity get cases.', () => {
    test.beforeAll(async () => {
        const userData = commonHelper.getUserData();
        userAccessToken = await libraryMasterApi.authApi.generateUserToken(userData);
        book = await libraryMasterApi.booksApi.create(userAccessToken, createBookPayload);
    });

    test.afterAll(async () => {
        await libraryMasterApi.booksApi.delete(userAccessToken, book.id);
    });

    test('@T994465e5 Book entity could be read.', async () => {
        const getBookResult = await libraryMasterApi.booksApi.get(userAccessToken, book.id);
        const expectedGetBookResult = generateExpectedGetBookResponse(book.id);

        expect(getBookResult).toEqual(expectedGetBookResult);
    });
});
