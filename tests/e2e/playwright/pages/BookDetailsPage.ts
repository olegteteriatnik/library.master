import { Page, Locator } from '@playwright/test';
import frameworkHelper from '../helpers/frameworkHelper';
import staticParams from '../params/constants';

export default class BookDetailsPage {
    private readonly area: Locator;

    private readonly header: Locator;

    private readonly headerTitle: Locator;

    private readonly deleteButton: Locator;

    private readonly editButton: Locator;

    private readonly confirmModal: Locator;

    private readonly confirmDeleteBook: Locator;

    private readonly bookDeletedMessage: Locator;

    private readonly editForm: Locator;

    private readonly titleInputField: Locator;

    private readonly authorInputField: Locator;

    private readonly yearInputField: Locator;

    private readonly availabilitySelect: Locator;

    private readonly saveButton: Locator;

    private readonly backToListButton: Locator;

    private readonly logoutButton: Locator;

    private readonly bookTitle: Locator;

    private readonly bookAuthor: Locator;

    private readonly bookYear: Locator;

    private readonly bookAvailability: Locator;

    constructor(
        private readonly page: Page,

        private readonly bookId: number,
    ) {
        this.area = this.page.locator('.book-details');

        this.header = this.page.locator('.header');

        this.headerTitle = this.header.locator('[data-testid="page-header"]');

        this.deleteButton = this.area.locator('[data-testid="delete-book-button"]');

        this.editButton = this.area.locator('[data-testid="edit-book-button"]');

        this.confirmModal = this.page.locator('#confirmModal');

        this.confirmDeleteBook = this.confirmModal.locator('#confirmYes');

        this.bookDeletedMessage = this.page.locator('#toast');

        this.editForm = this.page.locator('#editBookForm');

        this.titleInputField = this.editForm.locator('[name="title"]');

        this.authorInputField = this.editForm.locator('[name="author"]');

        this.yearInputField = this.editForm.locator('[name="year"]');

        this.availabilitySelect = this.editForm.locator('[name="isAvailable"]');

        this.saveButton = this.editForm.locator('[data-testid="save-book-button"]');

        this.backToListButton = this.header.locator('[data-testid="back-to-list-button"]');

        this.logoutButton = this.header.locator('[data-testid="logout-button"]');

        this.bookTitle = this.area.locator('[data-testid="book-title"]');

        this.bookAuthor = this.area.locator('[data-testid="book-author"]');

        this.bookYear = this.area.locator('[data-testid="book-year"]');

        this.bookAvailability = this.area.locator('[data-testid="book-availability"]');
    }

    private path(): string{
        return staticParams.routes.book(this.bookId);
    }

    public async visit(): Promise<void> {
        await this.page.goto(`${staticParams.baseUrl}${this.path()}`);
        await this.waitUntilIsOpened();
    }

    public async waitUntilIsOpened(): Promise<void> {
        await frameworkHelper.waitUntilElementVisible(this.area, staticParams.timeouts.pageRender);
        await frameworkHelper.waitUntilElementEnabled(this.area, staticParams.timeouts.pageRender);
    }

    public async isDisplayedAfterWait(): Promise<boolean> {
        return frameworkHelper.isElementDisplayedAfterWait(this.area, staticParams.timeouts.pageRender);
    }

    public isHeaderDisplayed(): Promise<boolean> {
        return this.header.isVisible();
    }

    public getHeaderTitle(): Promise<string | null> {
        return this.headerTitle.textContent();
    }

    public isBackToListButtonDisplayed(): Promise<boolean> {
        return this.backToListButton.isVisible();
    }

    public getBackToListButtonName(): Promise<string | null> {
        return this.backToListButton.textContent();
    }

    public isLogoutButtonDisplayed(): Promise<boolean> {
        return this.logoutButton.isVisible();
    }

    public getLogoutButtonName(): Promise<string | null> {
        return this.logoutButton.textContent();
    }

    public isBookDetailsSectionDisplayed(): Promise<boolean> {
        return this.area.isVisible();
    }

    public isBookTitleDisplayed(): Promise<boolean> {
        return this.bookTitle.isVisible();
    }

    public getBookTitle(): Promise<string | null> {
        return this.bookTitle.textContent();
    }

    public isBookAuthorDisplayed(): Promise<boolean> {
        return this.bookAuthor.isVisible();
    }

    public getBookAuthor(): Promise<string | null> {
        return this.bookAuthor.textContent();
    }

    public isBookYearDisplayed(): Promise<boolean> {
        return this.bookYear.isVisible();
    }

    public getBookYear(): Promise<string | null> {
        return this.bookYear.textContent();
    }

    public isBookAvailabilityDisplayed(): Promise<boolean> {
        return this.bookAvailability.isVisible();
    }

    public getBookAvailability(): Promise<string | null> {
        return this.bookAvailability.textContent();
    }

    public isEditButtonDisplayed(): Promise<boolean> {
        return this.editButton.isVisible();
    }

    public getEditButtonName(): Promise<string | null> {
        return this.editButton.textContent();
    }

    public isDeleteButtonDisplayed(): Promise<boolean> {
        return this.deleteButton.isVisible();
    }

    public getDeleteButtonName(): Promise<string | null> {
        return this.deleteButton.textContent();
    }

    public async clickDeleteButton(): Promise<void> {
        await this.deleteButton.click();
    }

    public async waitUntilConfirmModalIsOpened(): Promise<void> {
        await frameworkHelper.waitUntilElementVisible(this.confirmModal);
        await frameworkHelper.waitUntilElementEnabled(this.confirmModal);
    }

    public async confirmBookDeletion(): Promise<void> {
        await this.confirmDeleteBook.click();
    }

    public async waitUntilBookDeletedMessageAppears(): Promise<void> {
        await frameworkHelper.waitUntilElementVisible(this.bookDeletedMessage);
    }

    public async isBookDeletedMessageDisplayed(): Promise<boolean> {
        return this.bookDeletedMessage.isVisible();
    }

    public async clickEditButton(): Promise<void> {
        await this.editButton.click();
    }

    public async waitUntilEditFormIsOpened(): Promise<void> {
        await frameworkHelper.waitUntilElementVisible(this.editForm);
        await frameworkHelper.waitUntilElementEnabled(this.confirmDeleteBook);
    }

    public async waitUntilEditFormIsClosed(): Promise<void> {
        await frameworkHelper.waitUntilElementHidden(this.editForm);
    }

    public async isEditFormOpened(): Promise<boolean> {
        return this.editForm.isVisible();
    }

    public async fillTitleInEditForm(title: string): Promise<void> {
        await this.titleInputField.fill(title);
    }

    public async fillAuthorInEditForm(author: string): Promise<void> {
        await this.authorInputField.fill(author);
    }

    public async fillYearInEditForm(year: number): Promise<void> {
        await this.yearInputField.fill(year.toString());
    }

    public async selectAvailabilityInEditForm(availability: boolean): Promise<void> {
        await this.availabilitySelect.selectOption(availability.toString());
    }

    public async clickSaveButtonInEditForm(): Promise<void> {
        await this.saveButton.click();
    }

    public async clickBackToListButton(): Promise<void> {
        await this.backToListButton.click();
    }
}
