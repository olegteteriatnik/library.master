import { expect } from 'expect-webdriverio';
import commonHelper from '../../helpers/commonHelper';
import apiHelper from '../../helpers/apiHelper';
import BooksListPage from '../../pages/BooksListPage';
import texts from '../../texts';

describe('Books List page is displayed correctly.', () => {
    it('Books List page is displayed.', async () => {
        const booksListPage = new BooksListPage();
        const userData = await commonHelper.getUserData();
        await apiHelper.signInToLibraryMasterApp(userData);
        await booksListPage.visit();
        await booksListPage.waitForBooksListLoaded();

        expect(await booksListPage.isHeaderDisplayed()).toBe(true);
        expect(await booksListPage.getHeaderTitle()).toBe(texts.booksList.headerTitle);
        expect(await booksListPage.isSearchBarDisplayed()).toBe(true);
        expect(await booksListPage.getSearchBarPlaceholder()).toBe(texts.booksList.searchBarPlaceholder);
        expect(await booksListPage.isAddNewBookButtonDisplayed()).toBe(true);
        expect(await booksListPage.getAddNewBookButtonName()).toBe(texts.booksList.addNewBookButtonName);
        expect(await booksListPage.isLogoutButtonDisplayed()).toBe(true);
        expect(await booksListPage.getLogoutButtonName()).toBe(texts.booksList.logoutButtonName);
        expect(await booksListPage.isBookListDisplayed()).toBe(true);
        expect(await booksListPage.isBooksTableDisplayed()).toBe(true);
        expect(await booksListPage.getBooksTableTitle()).toBe(texts.booksList.booksTableTitle);
        expect(await booksListPage.isBooksTableHeaderDisplayed()).toBe(true);
        expect(await booksListPage.getBooksTableHeaderTexts()).toEqual(texts.booksList.booksTableHeaders);
        expect(await booksListPage.isBooksRecordsAreaDisplayed()).toBe(true);
        expect(await booksListPage.isPreviousPageButtonDisplayed()).toBe(true);
        expect(await booksListPage.getPreviousPageButtonName()).toBe(texts.booksList.previousPageButtonName);
        expect(await booksListPage.isPageIndicatorDisplayed()).toBe(true);
        expect(await booksListPage.getPageIndicatorName()).toContain(texts.booksList.pageIndicator);
        expect(await booksListPage.isNextPageButtonDisplayed()).toBe(true);
        expect(await booksListPage.getNextPageButtonName()).toBe(texts.booksList.nextPageButtonName);
    });
});
