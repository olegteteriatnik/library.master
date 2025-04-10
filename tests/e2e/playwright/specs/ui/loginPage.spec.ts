import { test, expect } from '@playwright/test';
import LoginPage from '../../pages/LoginPage';
import texts from '../../texts';

test.describe('Login page is displayed correctly', () => {
    test('@T8c30733f Login page is displayed.', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.visit();

        expect(await loginPage.isLoginFormDisplayed()).toBe(true);
        expect(await loginPage.getTitle()).toBe(texts.login.title);
        expect(await loginPage.isUserNameInputFieldDisplayed()).toBe(true);
        expect(await loginPage.getUserNameInputFieldTitle()).toBe(texts.login.userNameInputFieldTitle);
        expect(await loginPage.isPasswordInputFieldDisplayed()).toBe(true);
        expect(await loginPage.getPasswordInputFieldTitle()).toBe(texts.login.passwordInputFieldTitle);
        expect(await loginPage.isLoginButtonDisplayed()).toBe(true);
    });
});
