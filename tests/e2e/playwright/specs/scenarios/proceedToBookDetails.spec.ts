import { test, expect } from '@playwright/test';
import commonHelper from '../../helpers/commonHelper';
import frameworkHelper from '../../helpers/frameworkHelper';
import { LibraryMasterApi } from '../../api/libraryMasterApi';
import BooksListPage from '../../pages/BooksListPage';
import BookDetailsPage from '../../pages/BookDetailsPage';
import { BookEntity } from '../../api/services/booksApi/interfaces/BookEntity';
import data from '../../data/scenarios/proceedToBookDetails';

const libraryMasterApi = new LibraryMasterApi();
const { createBookPayload } = data;

let userAccessToken: string;
let book: BookEntity;

test.describe('Proceed to Book Details page cases.', () => {
    test.beforeAll(async () => {
        const userData = await commonHelper.getUserData();
        userAccessToken = await libraryMasterApi.authApi.generateUserToken(userData);
        book = await libraryMasterApi.booksApi.create(userAccessToken, createBookPayload);
    });

    test.afterAll(async () => {
        await libraryMasterApi.booksApi.delete(userAccessToken, book.id);
    });

    test('@T2cefc288 Proceed to Book Details from Books list.', async ({ page }) => {
        const bookListPage = new BooksListPage(page);
        const bookDetailsPage = new BookDetailsPage(page, book.id);
        await frameworkHelper.setUserAccessToken(page, userAccessToken);
        await bookListPage.visit();
        await bookListPage.searchForBook(book.title);
        await bookListPage.waitForBookDisplayed(book.id);
        await bookListPage.proceedToBookDetails(book.id);

        expect(await bookDetailsPage.isDisplayedAfterWait()).toBe(true);
    });
});
