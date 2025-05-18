import { WebDriver, WebElement, By, until } from 'selenium-webdriver';
import staticParams from '../params/constants';
import texts from '../texts';

export default class BooksListPage {
    constructor(private driver: WebDriver) {}

    private area = By.css('.booklist-container');

    private booksTableTitle = By.css('[data-testid="books-loading"]');

    private header = By.css('.header');

    private headerTitle = By.css('[data-testid="page-header"]');

    private searchBar = By.css('[data-testid="search-bar"]');

    private addNewBookButton = By.css('[data-testid="add-book-button"]');

    private logoutButton = By.css('[data-testid="logout-button"]');

    private booksTable = By.css('[data-testid="book-table"]');

    private booksTableHeader = By.css('thead tr');

    private booksTableHeaders = By.css('th');

    private booksRecordsArea = By.css('#bookTableBody');

    private previousPageButton = By.css('[data-testid="previous-page"]');

    private pageIndicator = By.css('[data-testid="current-page"]');

    private nextPageButton = By.css('[data-testid="next-page"]');

    private async getArea(): Promise<WebElement> {
        return this.driver.findElement(this.area);
    }

    private async getBooksTableTitleElement(): Promise<WebElement> {
        return (await this.getArea()).findElement(this.booksTableTitle);
    }

    private async getHeader(): Promise<WebElement> {
        return this.driver.findElement(this.header);
    }

    private async getHeaderTitleElement(): Promise<WebElement> {
        return (await this.getHeader()).findElement(this.headerTitle);
    }

    private async getSearchBar(): Promise<WebElement> {
        return (await this.getHeader()).findElement(this.searchBar);
    }

    private async getAddNewBookButton(): Promise<WebElement> {
        return (await this.getHeader()).findElement(this.addNewBookButton);
    }

    private async getLogoutButton(): Promise<WebElement> {
        return (await this.getHeader()).findElement(this.logoutButton);
    }

    private async getBooksTable(): Promise<WebElement> {
        return (await this.getArea()).findElement(this.booksTable);
    }

    private async getBooksTableHeaderElement(): Promise<WebElement> {
        return (await this.getBooksTable()).findElement(this.booksTableHeader);
    }

    private async getBooksTableHeadersElements(): Promise<WebElement[]> {
        return (await this.getBooksTableHeaderElement()).findElements(this.booksTableHeaders);
    }

    private async getBooksRecordsArea(): Promise<WebElement> {
        return (await this.getBooksTable()).findElement(this.booksRecordsArea);
    }

    private async getPreviousPageButton(): Promise<WebElement> {
        return (await this.getArea()).findElement(this.previousPageButton);
    }

    private async getPageIndicator(): Promise<WebElement> {
        return (await this.getArea()).findElement(this.pageIndicator);
    }

    private async getNextPageButton(): Promise<WebElement> {
        return (await this.getArea()).findElement(this.nextPageButton);
    }

    public async visit(): Promise<void> {
        await this.driver.get(staticParams.baseUrl);
        await this.waitUntilIsOpened();
    }

    public async waitUntilIsOpened(): Promise<void> {
        const area = await this.getArea();
        await this.driver.wait(until.elementIsVisible(area), staticParams.timeouts.pageRender);
        await this.driver.wait(until.elementIsEnabled(area), staticParams.timeouts.pageRender);
    }

    public async waitForBooksListLoaded(): Promise<void> {
        const booksTableTitle = await this.getBooksTableTitleElement();
        await this.driver.wait(until.elementTextIs(booksTableTitle, texts.booksList.booksTableTitle), staticParams.timeouts.booklistLoad);
    }

    public async isHeaderDisplayed(): Promise<boolean> {
        return (await this.getHeader()).isDisplayed();
    }

    public async getHeaderTitle(): Promise<string> {
        return (await this.getHeaderTitleElement()).getText();
    }

    public async isSearchBarDisplayed(): Promise<boolean> {
        return (await this.getSearchBar()).isDisplayed();
    }

    public async getSearchBarPlaceholder(): Promise<string> {
        return (await this.getSearchBar()).getAttribute('placeholder');
    }

    public async isAddNewBookButtonDisplayed(): Promise<boolean> {
        return (await this.getAddNewBookButton()).isDisplayed();
    }

    public async getAddNewBookButtonName(): Promise<string> {
        return (await this.getAddNewBookButton()).getText();
    }

    public async isLogoutButtonDisplayed(): Promise<boolean> {
        return (await this.getLogoutButton()).isDisplayed();
    }

    public async getLogoutButtonName(): Promise<string> {
        return (await this.getLogoutButton()).getText();
    }

    public async isBookListDisplayed(): Promise<boolean> {
        return (await this.getArea()).isDisplayed();
    }

    public async isBooksTableDisplayed(): Promise<boolean> {
        return (await this.getBooksTable()).isDisplayed();
    }

    public async getBooksTableTitle(): Promise<string> {
        return (await this.getBooksTableTitleElement()).getText();
    }

    public async isBooksTableHeaderDisplayed(): Promise<boolean> {
        return (await this.getBooksTableHeaderElement()).isDisplayed();
    }

    public async getBooksTableHeaderTexts(): Promise<string[]> {
        const headers = await this.getBooksTableHeadersElements();
        return await Promise.all(headers.map(el => el.getText()));
    }

    public async isBooksRecordsAreaDisplayed(): Promise<boolean> {
        return (await this.getBooksRecordsArea()).isDisplayed();
    }

    public async isPreviousPageButtonDisplayed(): Promise<boolean> {
        return (await this.getPreviousPageButton()).isDisplayed();
    }

    public async getPreviousPageButtonName(): Promise<string> {
        return (await this.getPreviousPageButton()).getText();
    }

    public async isPageIndicatorDisplayed(): Promise<boolean> {
        return (await this.getPageIndicator()).isDisplayed();
    }

    public async getPageIndicatorName(): Promise<string> {
        return (await this.getPageIndicator()).getText();
    }

    public async isNextPageButtonDisplayed(): Promise<boolean> {
        return (await this.getNextPageButton()).isDisplayed();
    }

    public async getNextPageButtonName(): Promise<string> {
        return (await this.getNextPageButton()).getText();
    }

    public async clickAddNewBookButton(): Promise<void> {
        await (await this.getAddNewBookButton()).click();
    }

    public async isDisplayedAfterWait(): Promise<boolean> {
        const area = await this.getArea();
        await this.driver.wait(until.elementIsVisible(area), staticParams.timeouts.pageRender);

        return area.isDisplayed();
    }
}
