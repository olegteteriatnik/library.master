import { Page, Locator } from '@playwright/test';
import frameworkHelper from '../helpers/frameworkHelper';
import staticParams from '../params/constants';

export default class BooksListPage {
    private readonly area: Locator;

    private readonly header: Locator;

    private readonly addNewBookButton: Locator;

    private readonly addBookModal: Locator;

    constructor(private readonly page: Page) {
        this.area = this.page.locator('.booklist-container');

        this.header = this.page.locator('.header');

        this.addNewBookButton = this.header.locator('[data-testid="add-book-button"]');

        this.addBookModal = this.page.locator('[data-testid="add-book-modal"]');
    }

    public async visit(): Promise<void> {
        await this.page.goto(`${staticParams.baseUrl}`);
        await this.waitUntilIsOpened();
    }

    public async waitUntilIsOpened(): Promise<void> {
        await frameworkHelper.waitUntilElementVisible(this.area, staticParams.timeouts.pageRender);
        await frameworkHelper.waitUntilElementEnabled(this.area, staticParams.timeouts.pageRender);
    }

    public async isDisplayedAfterWait(): Promise<boolean> {
        return frameworkHelper.isElementDisplayedAfterWait(this.area, staticParams.timeouts.pageRender);
    }

    public async clickAddNewBookButton(): Promise<void> {
        await this.addNewBookButton.click();
    }

    public async isAddBookModalDisplayedAfterWait(): Promise<boolean> {
        return frameworkHelper.isElementDisplayedAfterWait(this.addBookModal);
    }
}
