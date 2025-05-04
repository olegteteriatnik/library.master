import { Page, Locator } from '@playwright/test';
import frameworkHelper from '../helpers/frameworkHelper';
import staticParams from '../params/constants';
import { UserData } from '../api/services/authApi/interfaces/UserData';

export default class LoginPage {
    private readonly path = staticParams.routes.login;

    private readonly area: Locator;

    private readonly loginFormTitle: Locator;

    private readonly userNameInputField: Locator;

    private readonly passwordInputField: Locator;

    private readonly userNameLabel: Locator;

    private readonly passwordLabel: Locator;

    private readonly loginButton: Locator;

    constructor(private readonly page: Page) {
        this.area = this.page.locator('.login-container');

        this.loginFormTitle = this.area.locator('[data-testid="login-title"]');

        this.userNameInputField = this.area.locator('[data-testid="login-username-input"]');

        this.passwordInputField = this.area.locator('[data-testid="login-password-input"]');

        this.userNameLabel = this.area.locator('label[for="username"]');

        this.passwordLabel = this.area.locator('label[for="password"]');

        this.loginButton = this.area.locator('[data-testid="login-submit-button"]');
    }

    public async visit(): Promise<void> {
        await this.page.goto(`${staticParams.baseUrl}${this.path}`);
        await this.waitUntilIsOpened();
    }

    public async waitUntilIsOpened(): Promise<void> {
        await frameworkHelper.waitUntilElementVisible(this.area, staticParams.timeouts.pageRender);
        await frameworkHelper.waitUntilElementEnabled(this.area, staticParams.timeouts.pageRender);
    }

    public async isDisplayedAfterWait(): Promise<boolean> {
        return frameworkHelper.isElementDisplayedAfterWait(this.area, staticParams.timeouts.pageRender);
    }

    public isLoginFormDisplayed(): Promise<boolean> {
        return this.area.isVisible();
    }

    public getTitle(): Promise<string | null> {
        return this.loginFormTitle.textContent();
    }

    public isUserNameInputFieldDisplayed(): Promise<boolean> {
        return this.userNameInputField.isVisible();
    }

    public isPasswordInputFieldDisplayed(): Promise<boolean> {
        return this.passwordInputField.isVisible();
    }

    public getUserNameInputFieldTitle(): Promise<string | null> {
        return this.userNameLabel.textContent();
    }

    public getPasswordInputFieldTitle(): Promise<string | null> {
        return this.passwordLabel.textContent();
    }

    public isLoginButtonDisplayed(): Promise<boolean> {
        return this.loginButton.isVisible();
    }

    public async setUsername(username: string): Promise<void> {
        await this.userNameInputField.fill(username);
    }

    public async setPassword(password: string): Promise<void> {
        await this.passwordInputField.fill(password);
    }

    public async clickLoginButton(): Promise<void> {
        await this.loginButton.click();
    }

    public async login(data: UserData): Promise<void> {
        await this.setUsername(data.username);
        await this.setPassword(data.password);
        await this.clickLoginButton();
    }
}
