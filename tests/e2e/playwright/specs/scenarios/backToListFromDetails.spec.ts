import { test, expect } from '@playwright/test';
import commonHelper from '../../helpers/commonHelper';
import frameworkHelper from '../../helpers/frameworkHelper';
import { LibraryMasterApi } from '../../api/libraryMasterApi';
import BookDetailsPage from '../../pages/BookDetailsPage';
import BooksListPage from '../../pages/BooksListPage';
import { BookEntity } from '../../api/services/booksApi/interfaces/BookEntity';
import data from '../../data/scenarios/backToListFromDetails';

const libraryMasterApi = new LibraryMasterApi();
const { createBookPayload } = data;

let userAccessToken: string;
let book: BookEntity;

test.describe('Back to Books list from Book Details page cases.', () => {
    test.beforeAll(async () => {
        const userData = commonHelper.getUserData();
        userAccessToken = await libraryMasterApi.authApi.generateUserToken(userData);
        book = await libraryMasterApi.booksApi.create(userAccessToken, createBookPayload);
    });

    test.afterAll(async () => {
        await libraryMasterApi.booksApi.delete(userAccessToken, book.id);
    });

    test('@T8c716ff5 It could be possible back to List page from Book Details Page.', async ({ page }) => {
        const bookDetailsPage = new BookDetailsPage(page, book.id);
        const booksListPage = new BooksListPage(page);
        await frameworkHelper.setUserAccessToken(page, userAccessToken);
        await bookDetailsPage.visit();
        await bookDetailsPage.clickBackToListButton();

        expect(await booksListPage.isDisplayedAfterWait()).toBe(true);
    });
});
