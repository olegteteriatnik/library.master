import { test, expect } from '@playwright/test';
import commonHelper from '../../helpers/commonHelper';
import { LibraryMasterApi } from '../../api/libraryMasterApi';
import { BookEntity } from '../../api/services/booksApi/interfaces/BookEntity';
import data from '../../data/api/checkBookAvailability';

const libraryMasterApi = new LibraryMasterApi();
const { createBookPayload } = data;

let userAccessToken: string;
let book: BookEntity;

test.describe('Book entity availability cases.', () => {
    test.beforeAll(async () => {
        const userData = await commonHelper.getUserData();
        userAccessToken = await libraryMasterApi.authApi.generateUserToken(userData);
        book = await libraryMasterApi.booksApi.create(userAccessToken, createBookPayload);
    });

    test.afterAll(async () => {
        await libraryMasterApi.booksApi.delete(userAccessToken, book.id);
    });

    test('@Td131eeec Book entity availability could be returned.', async () => {
        const checkBookAvailabilityResult = await libraryMasterApi.booksApi.checkAvailability(userAccessToken, book.id);

        expect(checkBookAvailabilityResult.id).toBe(book.id);
        expect(checkBookAvailabilityResult.isAvailable).toBe(true);
    });
});
