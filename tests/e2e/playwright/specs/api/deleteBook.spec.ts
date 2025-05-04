import { test, expect } from '@playwright/test';
import commonHelper from '../../helpers/commonHelper';
import { LibraryMasterApi } from '../../api/libraryMasterApi';
import { BookEntity } from '../../api/services/booksApi/interfaces/BookEntity';
import data from '../../data/api/deleteBook';

const libraryMasterApi = new LibraryMasterApi();
const { createBookPayload } = data;

let userAccessToken: string;
let book: BookEntity;

test.describe('Book entity delete cases.', () => {
    test.beforeAll(async () => {
        const userData = await commonHelper.getUserData();
        userAccessToken = await libraryMasterApi.authApi.generateUserToken(userData);
        book = await libraryMasterApi.booksApi.create(userAccessToken, createBookPayload);
    });

    test('@T7eb8c631 Book entity could be deleted.', async () => {
        const deleteBookResult = await libraryMasterApi.booksApi.delete(userAccessToken, book.id);
        const bookAfterDeletion = await libraryMasterApi.booksApi.get(userAccessToken, book.id);

        expect(deleteBookResult).toBe(true);
        expect(bookAfterDeletion).toBeNull();
    });
});
