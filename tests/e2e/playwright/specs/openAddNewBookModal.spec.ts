import { test, expect } from '@playwright/test';
import commonHelper from '../helpers/commonHelper';
import apiHelper from '../helpers/apiHelper';
import BooksListPage from '../pages/BooksListPage';

test.describe('Add New Book modal cases.', () => {
    test('It could be possible to open Add New Book modal.', async ({ page }) => {
        const userData = await commonHelper.getUserData();
        const booksListPage = new BooksListPage(page);
        await apiHelper.signInToLibraryMasterApp(page, userData);
        await booksListPage.visit();
        await booksListPage.waitUntilIsOpened();
        await booksListPage.clickAddNewBookButton();

        expect(await booksListPage.isAddBookModalDisplayedAfterWait()).toBe(true);
    });
});
