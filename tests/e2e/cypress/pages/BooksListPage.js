import staticParams from '../params/constants';
import texts from '../texts';

export class BooksListPage {
    area = '.booklist-container';

    booksTableTitle = '[data-testid="books-loading"]';

    header = '.header';

    headerTitle = '[data-testid="page-header"]';

    searchBar = '[data-testid="search-bar"]';

    addNewBookButton = '[data-testid="add-book-button"]';

    logoutButton = '[data-testid="logout-button"]';

    booksTable = '[data-testid="book-table"]';

    booksTableHeader = 'thead tr';

    booksTableHeaders = 'th';

    previousPageButton = '[data-testid="previous-page"]';

    pageIndicator = '[data-testid="current-page"]';

    nextPageButton = '[data-testid="next-page"]';

    getArea(options = {}) {
        return cy.get(this.area, options);
    }

    getHeader() {
        return cy.get(this.header);
    }

    getHeaderTitle() {
        return this.getHeader().find(this.headerTitle);
    }

    getSearchBar() {
        return this.getHeader().find(this.searchBar);
    }

    getAddNewBookButton() {
        return this.getHeader().find(this.addNewBookButton);
    }

    getLogoutButton() {
        return this.getHeader().find(this.logoutButton);
    }

    getBooksTable() {
        return this.getArea().find(this.booksTable);
    }

    getBooksTableHeader() {
        return this.getBooksTable().find(this.booksTableHeader);
    }

    getBooksTableHeaders() {
        return this.getBooksTableHeader().find(this.booksTableHeaders);
    }

    getBooksTableTitle() {
        return this.getArea().find(this.booksTableTitle);
    }

    getPreviousPageButton() {
        return this.getArea().find(this.previousPageButton);
    }

    getPageIndicator() {
        return this.getArea().find(this.pageIndicator);
    }

    getNextPageButton() {
        return this.getArea().find(this.nextPageButton);
    }

    visit() {
        cy.loginAndVisitBooksListPage();
    }

    waitUntilIsOpened() {
        this.getArea({ timeout: staticParams.timeouts.pageRender })
            .should('be.visible')
            .and('not.be.disabled');
    }

    waitForBooksListLoaded() {
        cy.get(this.booksTableTitle, { timeout: staticParams.timeouts.booklistLoad})
            .should('have.text', texts.booksList.booksTableTitle);
    }

    assertHeaderIsVisible() {
        this.getHeader().should('be.visible');
    }

    assertHeaderTitle() {
        this.getHeaderTitle().should('have.text', texts.booksList.headerTitle);
    }

    assertSearchBarVisible() {
        this.getSearchBar().should('be.visible');
    }

    assertSearchBarPlaceholder() {
        this.getSearchBar().should('have.attr', 'placeholder', texts.booksList.searchBarPlaceholder);
    }

    assertAddNewBookButtonVisible() {
        this.getAddNewBookButton().should('be.visible');
    }

    assertAddNewBookButtonName() {
        this.getAddNewBookButton().should('have.text', texts.booksList.addNewBookButtonName);
    }

    assertLogoutButtonVisible() {
        this.getLogoutButton().should('be.visible');
    }

    assertLogoutButtonName() {
        this.getLogoutButton().should('have.text', texts.booksList.logoutButtonName);
    }

    assertBookListVisible() {
        this.getArea().should('be.visible');
    }

    assertBooksTableVisible() {
        this.getBooksTable().should('be.visible');
    }

    assertBooksTableTitle() {
        this.getBooksTableTitle().should('have.text', texts.booksList.booksTableTitle);
    }

    assertBooksTableHeaderVisible() {
        this.getBooksTableHeader().should('be.visible');
    }

    assertBooksTableHeaders() {
        this.getBooksTableHeaders().then(($headers) => {
            const actual = [...$headers].map(el => el.textContent.trim());
            expect(actual).to.deep.equal(texts.booksList.booksTableHeaders);
        });
    }

    assertPreviousPageButtonVisible() {
        this.getPreviousPageButton().should('be.visible');
    }

    assertPreviousPageButtonName() {
        this.getPreviousPageButton().should('have.text', texts.booksList.previousPageButtonName);
    }

    assertPageIndicatorVisible() {
        this.getPageIndicator().should('be.visible');
    }

    assertPageIndicatorName() {
        this.getPageIndicator().should('contain', texts.booksList.pageIndicator);
    }

    assertNextPageButtonVisible() {
        this.getNextPageButton().should('be.visible');
    }

    assertNextPageButtonName() {
        this.getNextPageButton().should('have.text', texts.booksList.nextPageButtonName);
    }

    clickAddNewBookButton() {
        this.getAddNewBookButton().click();
    }

    assertDisplayedAfterWait() {
        this.getArea({ timeout: staticParams.timeouts.pageRender }).should('be.visible');
    }
}
