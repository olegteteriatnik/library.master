import { BooksListPage } from '../../pages/BooksListPage';

const booksListPage = new BooksListPage();

describe('Books List page is displayed correctly', () => {
    before(() => {
        booksListPage.visit();
    });

    it('Books List page is displayed', () => {
        booksListPage.waitUntilIsOpened();
        booksListPage.waitForBooksListLoaded();

        booksListPage.assertHeaderIsVisible();
        booksListPage.assertHeaderTitle();
        booksListPage.assertSearchBarVisible();
        booksListPage.assertSearchBarPlaceholder();
        booksListPage.assertAddNewBookButtonVisible();
        booksListPage.assertAddNewBookButtonName();
        booksListPage.assertLogoutButtonVisible();
        booksListPage.assertLogoutButtonName();
        booksListPage.assertBookListVisible();
        booksListPage.assertBooksTableVisible();
        booksListPage.assertBooksTableTitle();
        booksListPage.assertBooksTableHeaderVisible();
        booksListPage.assertBooksTableHeaders();
        booksListPage.assertPreviousPageButtonVisible();
        booksListPage.assertPreviousPageButtonName();
        booksListPage.assertPageIndicatorVisible();
        booksListPage.assertPageIndicatorName();
        booksListPage.assertNextPageButtonVisible();
        booksListPage.assertNextPageButtonName();
    });
});