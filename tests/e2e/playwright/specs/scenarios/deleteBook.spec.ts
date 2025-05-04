import { test, expect } from '@playwright/test';
import commonHelper from '../../helpers/commonHelper';
import frameworkHelper from '../../helpers/frameworkHelper';
import { LibraryMasterApi } from '../../api/libraryMasterApi';
import BookDetailsPage from '../../pages/BookDetailsPage';
import BooksListPage from '../../pages/BooksListPage';
import { BookEntity } from '../../api/services/booksApi/interfaces/BookEntity';
import data from '../../data/scenarios/deleteBook';

const libraryMasterApi = new LibraryMasterApi();
const { createBookPayload } = data;

let userAccessToken: string;
let book: BookEntity;

test.describe('Delete Book cases.', () => {
    test.beforeAll(async () => {
        const userData = await commonHelper.getUserData();
        userAccessToken = await libraryMasterApi.authApi.generateUserToken(userData);
        book = await libraryMasterApi.booksApi.create(userAccessToken, createBookPayload);
    });

    test('@T20b67047 It could be possible to delete a book.', async ({ page }) => {
        const bookDetailsPage = new BookDetailsPage(page, book.id);
        const bookListPage = new BooksListPage(page);
        await frameworkHelper.setUserAccessToken(page, userAccessToken);
        await bookDetailsPage.visit();
        await bookDetailsPage.clickDeleteButton();
        await bookDetailsPage.waitUntilConfirmModalIsOpened();
        await bookDetailsPage.confirmBookDeletion();
        await bookDetailsPage.waitUntilBookDeletedMessageAppears();
        const bookAfterDeletion = await libraryMasterApi.booksApi.get(userAccessToken, book.id);

        expect(await bookDetailsPage.isBookDeletedMessageDisplayed()).toBe(true);
        expect(await bookListPage.isDisplayedAfterWait()).toBe(true);
        expect(bookAfterDeletion).toBeNull();
    });
});
