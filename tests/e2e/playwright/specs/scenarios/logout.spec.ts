import { test, expect } from '@playwright/test';
import commonHelper from '../../helpers/commonHelper';
import apiHelper from '../../helpers/apiHelper';
import BooksListPage from '../../pages/BooksListPage';
import LoginPage from '../../pages/LoginPage';

test.describe('Log out cases.', () => {
    test('@T44049f54 It could be possible to log out from Books page.', async ({ page }) => {
        const userData = await commonHelper.getUserData();
        const booksListPage = new BooksListPage(page);
        const loginPage = new LoginPage(page);
        await apiHelper.signInToLibraryMasterApp(page, userData);
        await booksListPage.visit();
        await booksListPage.clickLogoutButton();

        expect(await loginPage.isDisplayedAfterWait()).toBe(true);
    });
});
