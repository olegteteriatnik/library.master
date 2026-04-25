import { test, expect } from '@playwright/test';
import commonHelper from '../../helpers/commonHelper';
import apiHelper from '../../helpers/apiHelper';
import { LibraryMasterApi } from '../../api/libraryMasterApi';
import BooksListPage from '../../pages/BooksListPage';
import AddBookModal from '../../pages/fragments/AddBookModal';
import { BookEntity } from '../../api/services/booksApi/interfaces/BookEntity';
import data from '../../data/scenarios/addNewBook';

const libraryMasterApi = new LibraryMasterApi();
const { book, generateExpectedBookData } = data;

let userAccessToken: string;
let createdBook: BookEntity;
let booksListPage: BooksListPage;
let addBookModal: AddBookModal;

test.describe('Add new book cases.', () => {
    test.beforeEach(async ({ page }) => {
        booksListPage = new BooksListPage(page);
        addBookModal = new AddBookModal(page);
        const userData = commonHelper.getUserData();
        userAccessToken = await apiHelper.signInToLibraryMasterApp(page, userData);
        await booksListPage.visit();
        await booksListPage.clickAddNewBookButton();
        await addBookModal.waitUntilIsOpened();
        await addBookModal.fillForm(book);
        await addBookModal.clickAddButton();
        createdBook = await apiHelper.waitForBookToBeCreated(userAccessToken, book.title);
    });

    test.afterEach(async () => {
        await libraryMasterApi.booksApi.delete(userAccessToken, createdBook.id);
    });

    test('@Tb1c66bb8 It could be possible to add new book.', async () => {
        const expectedBookData = generateExpectedBookData(createdBook.id);

        expect(await addBookModal.isHiddenAfterWait()).toBe(true);
        expect(await booksListPage.isDisplayedAfterWait()).toBe(true);
        expect(createdBook).toEqual(expectedBookData);
    });
});
