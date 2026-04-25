import { test, expect } from '@playwright/test';
import LoginPage from '../../pages/LoginPage';
import BooksListPage from '../../pages/BooksListPage';
import commonHelper from '../../helpers/commonHelper';
import frameworkHelper from '../../helpers/frameworkHelper';

test.describe('Log in to LibraryMaster cases.', () => {
    test('@T4d74d633 It could be possible to log in to LibraryMaster.', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const booksListPage = new BooksListPage(page);
        const userData = commonHelper.getUserData();
        await loginPage.visit();
        await loginPage.login(userData);
        await booksListPage.waitUntilIsOpened();
        const token = await frameworkHelper.getTokenFromLocalStorage(page);

        expect(await booksListPage.isDisplayedAfterWait()).toBe(true);
        expect(token).toBeDefined();
        expect(commonHelper.isTokenValid(token)).toBe(true);
    });
});
