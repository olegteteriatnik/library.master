import { test, expect } from '@playwright/test';
import commonHelper from '../../helpers/commonHelper';
import { LibraryMasterApi } from '../../api/libraryMasterApi';
import { BookEntity } from '../../api/services/booksApi/interfaces/BookEntity';
import data from '../../data/api/updateBook';

const libraryMasterApi = new LibraryMasterApi();
const {
    createBookPayload,
    generateUpdateBookPayloadAndExpectedResult,
} = data;

let userAccessToken: string;
let book: BookEntity;

test.describe('Book entity update cases.', () => {
    test.beforeAll(async () => {
        const userData = await commonHelper.getUserData();
        userAccessToken = await libraryMasterApi.authApi.generateUserToken(userData);
        book = await libraryMasterApi.booksApi.create(userAccessToken, createBookPayload);
    });

    test.afterAll(async () => {
        await libraryMasterApi.booksApi.delete(userAccessToken, book.id);
    });

    test('@T2f102ee9 Book entity could be updated.', async () => {
        const expectedUpdateBookResult = generateUpdateBookPayloadAndExpectedResult(book.id);
        const updateBookResult = await libraryMasterApi.booksApi.update(userAccessToken, expectedUpdateBookResult);

        expect(updateBookResult).toEqual(expectedUpdateBookResult);
    });
});
