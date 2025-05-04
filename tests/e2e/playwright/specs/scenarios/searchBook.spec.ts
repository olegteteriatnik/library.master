import { test, expect } from '@playwright/test';
import commonHelper from '../../helpers/commonHelper';
import frameworkHelper from '../../helpers/frameworkHelper';
import { LibraryMasterApi } from '../../api/libraryMasterApi';
import BooksListPage from '../../pages/BooksListPage';
import { BookEntity } from '../../api/services/booksApi/interfaces/BookEntity';
import data from '../../data/scenarios/searchBook';

const libraryMasterApi = new LibraryMasterApi();
const { createBookPayload } = data;

let userAccessToken: string;
let book: BookEntity;

test.describe('Search book cases.', () => {
    test.beforeAll(async () => {
        const userData = await commonHelper.getUserData();
        userAccessToken = await libraryMasterApi.authApi.generateUserToken(userData);
        book = await libraryMasterApi.booksApi.create(userAccessToken, createBookPayload);
    });

    test.afterAll(async () => {
        await libraryMasterApi.booksApi.delete(userAccessToken, book.id);
    });

    test('@Tf42e5769 It could be possible to find a book by search bar.', async ({ page }) => {
        const bookListPage = new BooksListPage(page);
        await frameworkHelper.setUserAccessToken(page, userAccessToken);
        await bookListPage.visit();
        await bookListPage.searchForBook(book.title);

        expect(await bookListPage.isBookDisplayedAfterWait(book.id)).toBe(true);
    });
});
