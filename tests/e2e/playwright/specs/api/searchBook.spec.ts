import { test, expect } from '@playwright/test';
import commonHelper from '../../helpers/commonHelper';
import { LibraryMasterApi } from '../../api/libraryMasterApi';
import { BookEntity } from '../../api/services/booksApi/interfaces/BookEntity';
import data from '../../data/api/searchBook';

const libraryMasterApi = new LibraryMasterApi();
const { createBookPayload, generateExpectedFindBookByTitleResult } = data;

let userAccessToken: string;
let book: BookEntity;

test.describe('Book entity search cases.', () => {
    test.beforeAll(async () => {
        const userData = commonHelper.getUserData();
        userAccessToken = await libraryMasterApi.authApi.generateUserToken(userData);
        book = await libraryMasterApi.booksApi.create(userAccessToken, createBookPayload);
    });

    test.afterAll(async () => {
        await libraryMasterApi.booksApi.delete(userAccessToken, book.id);
    });

    test('@Tcbafe078 Book entity could be found by title.', async () => {
        const expectedFindBookByTitleResult = generateExpectedFindBookByTitleResult(book.id);
        const findBookByTitleResult = await libraryMasterApi.booksApi.search(userAccessToken, { title: book.title });

        expect(findBookByTitleResult).toEqual(expectedFindBookByTitleResult);
    });
});
