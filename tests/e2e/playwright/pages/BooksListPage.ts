import { Page, Locator, expect } from '@playwright/test';
import frameworkHelper from '../helpers/frameworkHelper';
import staticParams from '../params/constants';
import texts from '../texts';

export default class BooksListPage {
    private readonly area: Locator;

    private readonly header: Locator;

    private readonly headerTitle: Locator;

    private readonly addNewBookButton: Locator;

    private readonly booksTableTitle: Locator;

    private readonly booksTable: Locator;

    private readonly booksTableHeader: Locator;

    private readonly booksTableHeaders: Locator;

    private readonly booksRecordsArea: Locator;

    private readonly previousPageButton: Locator;

    private readonly pageIndicator: Locator;

    private readonly nextPageButton: Locator;

    private readonly logoutButton: Locator;

    private readonly searchBar: Locator;

    private readonly bookLocatorTemplate: string;

    constructor(private readonly page: Page) {
        this.area = this.page.locator('.booklist-container');

        this.header = this.page.locator('.header');

        this.headerTitle = this.header.locator('[data-testid="page-header"]');

        this.booksTableTitle = this.area.locator('[data-testid="books-loading"]')

        this.booksTable = this.area.locator('[data-testid="book-table"]');

        this.booksTableHeader = this.booksTable.locator('thead tr');

        this.booksTableHeaders = this.booksTableHeader.locator('th');

        this.booksRecordsArea = this.booksTable.locator('#bookTableBody');

        this.previousPageButton = this.area.locator('[data-testid="previous-page"]');

        this.pageIndicator = this.area.locator('[data-testid="current-page"]');

        this.nextPageButton = this.area.locator('[data-testid="next-page"]');

        this.addNewBookButton = this.header.locator('[data-testid="add-book-button"]');

        this.logoutButton = this.header.locator('[data-testid="logout-button"]');

        this.searchBar = this.header.locator('[data-testid="search-bar"]');

        this.bookLocatorTemplate = '[data-testid="book-link-#"]';
    }

    private getBookLocator(bookId: number): Locator {
        const selector = this.bookLocatorTemplate.replace('#', bookId.toString());
        return this.area.locator(selector);
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

    public async waitForBooksListLoaded(): Promise<void> {
        await expect(this.booksTableTitle).toHaveText(texts.booksList.booksTableTitle, { timeout: staticParams.timeouts.booklistLoad });
    }

    public isHeaderDisplayed(): Promise<boolean> {
        return this.header.isVisible();
    }

    public getHeaderTitle(): Promise<string | null> {
        return this.headerTitle.textContent();
    }

    public isSearchBarDisplayed(): Promise<boolean> {
        return this.searchBar.isVisible();
    }

    public getSearchBarPlaceholder(): Promise<string | null> {
        return this.searchBar.getAttribute('placeholder');
    }

    public isAddNewBookButtonDisplayed(): Promise<boolean> {
        return this.addNewBookButton.isVisible();
    }

    public getAddNewBookButtonName(): Promise<string | null> {
        return this.addNewBookButton.textContent();
    }

    public isLogoutButtonDisplayed(): Promise<boolean> {
        return this.logoutButton.isVisible();
    }

    public getLogoutButtonName(): Promise<string | null> {
        return this.logoutButton.textContent();
    }

    public isBookListDisplayed(): Promise<boolean> {
        return this.area.isVisible();
    }

    public getBooksTableTitle(): Promise<string | null> {
        return this.booksTableTitle.textContent();
    }

    public isBooksTableDisplayed(): Promise<boolean> {
        return this.booksTable.isVisible();
    }

    public isBooksTableHeaderDisplayed(): Promise<boolean> {
        return this.booksTableHeader.isVisible();
    }

    public getBooksTableHeaderTexts(): Promise<string[]> {
        return this.booksTableHeaders.allTextContents();
    }

    public isBooksRecordsAreaDisplayed(): Promise<boolean> {
        return this.booksRecordsArea.isVisible();
    }

    public isPreviousPageButtonDisplayed(): Promise<boolean> {
        return this.previousPageButton.isVisible();
    }

    public getPreviousPageButtonName(): Promise<string | null> {
        return this.previousPageButton.textContent();
    }

    public isPageIndicatorDisplayed(): Promise<boolean> {
        return this.pageIndicator.isVisible();
    }

    public getPageIndicatorName(): Promise<string | null> {
        return this.pageIndicator.textContent();
    }

    public isNextPageButtonDisplayed(): Promise<boolean> {
        return this.nextPageButton.isVisible();
    }

    public getNextPageButtonName(): Promise<string | null> {
        return this.nextPageButton.textContent();
    }

    public async clickAddNewBookButton(): Promise<void> {
        await this.addNewBookButton.click();
    }

    public async clickLogoutButton(): Promise<void> {
        await this.logoutButton.click();
    }

    public async searchForBook(title: string): Promise<void> {
        await this.searchBar.fill(title);
        await frameworkHelper.pressEnter(this.searchBar);
    }

    public async isBookDisplayedAfterWait(bookId: number): Promise<boolean> {
        return frameworkHelper.isElementDisplayedAfterWait(this.getBookLocator(bookId), staticParams.timeouts.pageRender);
    }

    public async waitForBookDisplayed(bookId: number): Promise<void> {
        await frameworkHelper.waitUntilElementVisible(this.getBookLocator(bookId), staticParams.timeouts.pageRender);
    }

    public async proceedToBookDetails(bookId: number): Promise<void> {
        await this.getBookLocator(bookId).click();
    }
}
