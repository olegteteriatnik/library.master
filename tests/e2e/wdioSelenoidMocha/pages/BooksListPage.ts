import { expect } from 'expect-webdriverio';
import staticParams from '../params/constants';
import texts from '../texts';

export default class BooksListPage {
    private readonly area = $('.booklist-container');

    private readonly booksTableTitle = this.area.$('[data-testid="books-loading"]');

    private readonly header = $('.header');

    private readonly headerTitle = this.header.$('[data-testid="page-header"]');

    private readonly searchBar = this.header.$('[data-testid="search-bar"]');

    private readonly addNewBookButton = this.header.$('[data-testid="add-book-button"]');

    private readonly logoutButton = this.header.$('[data-testid="logout-button"]');

    private readonly booksTable = this.area.$('[data-testid="book-table"]');

    private readonly booksTableHeader = this.booksTable.$('thead tr');

    private readonly booksTableHeaders = this.booksTableHeader.$$('th');

    private readonly booksRecordsArea = this.booksTable.$('#bookTableBody');

    private readonly previousPageButton = this.area.$('[data-testid="previous-page"]');

    private readonly pageIndicator = this.area.$('[data-testid="current-page"]');

    private readonly nextPageButton = this.area.$('[data-testid="next-page"]');

    public async visit(): Promise<void> {
        await browser.url(staticParams.baseUrl);
        await this.waitUntilIsOpened();
    }

    public async waitUntilIsOpened(): Promise<void> {
        await this.area.waitForDisplayed({ timeout: staticParams.timeouts.pageRender });
        await this.area.waitForEnabled({ timeout: staticParams.timeouts.pageRender });
    }

    public async waitForBooksListLoaded(): Promise<void> {
        await expect(this.booksTableTitle).toHaveText(texts.booksList.booksTableTitle, {
            wait: staticParams.timeouts.booklistLoad,
        });
    }

    public isHeaderDisplayed(): Promise<boolean> {
        return this.header.isDisplayed();
    }

    public getHeaderTitle(): Promise<string> {
        return this.headerTitle.getText();
    }

    public isSearchBarDisplayed(): Promise<boolean> {
        return this.searchBar.isDisplayed();
    }

    public getSearchBarPlaceholder(): Promise<string> {
        return this.searchBar.getAttribute('placeholder');
    }

    public isAddNewBookButtonDisplayed(): Promise<boolean> {
        return this.addNewBookButton.isDisplayed();
    }

    public getAddNewBookButtonName(): Promise<string> {
        return this.addNewBookButton.getText();
    }

    public isLogoutButtonDisplayed(): Promise<boolean> {
        return this.logoutButton.isDisplayed();
    }

    public getLogoutButtonName(): Promise<string> {
        return this.logoutButton.getText();
    }

    public isBookListDisplayed(): Promise<boolean> {
        return this.area.isDisplayed();
    }

    public isBooksTableDisplayed(): Promise<boolean> {
        return this.booksTable.isDisplayed();
    }

    public getBooksTableTitle(): Promise<string> {
        return this.booksTableTitle.getText();
    }

    public isBooksTableHeaderDisplayed(): Promise<boolean> {
        return this.booksTableHeader.isDisplayed();
    }

    public async getBooksTableHeaderTexts(): Promise<string[]> {
        return await this.booksTableHeaders.map((el) => el.getText());
    }

    public isBooksRecordsAreaDisplayed(): Promise<boolean> {
        return this.booksRecordsArea.isDisplayed();
    }

    public isPreviousPageButtonDisplayed(): Promise<boolean> {
        return this.previousPageButton.isDisplayed();
    }

    public getPreviousPageButtonName(): Promise<string> {
        return this.previousPageButton.getText();
    }

    public isPageIndicatorDisplayed(): Promise<boolean> {
        return this.pageIndicator.isDisplayed();
    }

    public getPageIndicatorName(): Promise<string> {
        return this.pageIndicator.getText();
    }

    public isNextPageButtonDisplayed(): Promise<boolean> {
        return this.nextPageButton.isDisplayed();
    }

    public getNextPageButtonName(): Promise<string> {
        return this.nextPageButton.getText();
    }

    public async clickAddNewBookButton(): Promise<void> {
        await this.addNewBookButton.click();
    }

    public async isDisplayedAfterWait(): Promise<boolean> {
        return this.area.waitForDisplayed({ timeout: staticParams.timeouts.pageRender });
    }
}
