import { Page, Locator } from '@playwright/test';
import frameworkHelper from '../../helpers/frameworkHelper';
import { AddBookPayload } from '../interfaces/AddBookPayload';

export default class AddBookModal {
    private readonly modal: Locator;

    private readonly titleInput: Locator;

    private readonly authorInput: Locator;

    private readonly yearInput: Locator;

    private readonly addButton: Locator;

    constructor(private readonly page: Page) {
        this.modal = this.page.locator('[data-testid="add-book-modal"]');

        this.titleInput = this.modal.locator('[data-testid="add-book-title-input"]');

        this.authorInput = this.modal.locator('[data-testid="add-book-author-input"]');

        this.yearInput = this.modal.locator('[data-testid="add-book-year-input"]');

        this.addButton = this.modal.locator('[data-testid="add-book-submit-button"]');
    }

    public async isDisplayedAfterWait(): Promise<boolean> {
        return await frameworkHelper.isElementDisplayedAfterWait(this.modal);
    }

    public async waitUntilIsOpened(): Promise<void> {
        await frameworkHelper.waitUntilElementVisible(this.modal);
        await frameworkHelper.waitUntilElementEnabled(this.modal);
    }

    public async isElementHiddenAfterWait(): Promise<boolean> {
        return await frameworkHelper.isElementHiddenAfterWait(this.modal);
    }

    public async fillForm(data: AddBookPayload): Promise<void> {
        await this.titleInput.fill(data.title);
        await this.authorInput.fill(data.author);
        await this.yearInput.fill(String(data.year));
    }

    public async clickAddButton(): Promise<void> {
        await this.addButton.click();
    }
}
