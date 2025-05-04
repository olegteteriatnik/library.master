import { test, expect } from '@playwright/test';
import commonHelper from '../../helpers/commonHelper';
import frameworkHelper from '../../helpers/frameworkHelper';
import { LibraryMasterApi } from '../../api/libraryMasterApi';
import BookDetailsPage from '../../pages/BookDetailsPage';
import { BookEntity } from '../../api/services/booksApi/interfaces/BookEntity';
import data from '../../data/scenarios/editBook';

const libraryMasterApi = new LibraryMasterApi();
const {
    createBookPayload,
    updateBookData,
    expectedUpdatedBookData,
} = data;

let userAccessToken: string;
let book: BookEntity;

test.describe('Edit Book cases.', () => {
    test.beforeAll(async () => {
        const userData = await commonHelper.getUserData();
        userAccessToken = await libraryMasterApi.authApi.generateUserToken(userData);
        book = await libraryMasterApi.booksApi.create(userAccessToken, createBookPayload);
    });

    test.afterAll(async () => {
        await libraryMasterApi.booksApi.delete(userAccessToken, book.id);
    });

    test('@T9e65b015 It could be possible to edit all fields of the book on Book Details Page.', async ({ page }) => {
        const bookDetailsPage = new BookDetailsPage(page, book.id);
        await frameworkHelper.setUserAccessToken(page, userAccessToken);
        await bookDetailsPage.visit();
        await bookDetailsPage.clickEditButton();
        await bookDetailsPage.waitUntilEditFormIsOpened();
        await bookDetailsPage.fillTitleInEditForm(updateBookData.title);
        await bookDetailsPage.fillAuthorInEditForm(updateBookData.author);
        await bookDetailsPage.fillYearInEditForm(updateBookData.year);
        await bookDetailsPage.selectAvailabilityInEditForm(updateBookData.isAvailable);
        await bookDetailsPage.clickSaveButtonInEditForm();
        await bookDetailsPage.waitUntilEditFormIsClosed();
        const updatedBook = await libraryMasterApi.booksApi.get(userAccessToken, book.id);

        expect(await bookDetailsPage.isEditFormOpened()).toBe(false);
        expect(await bookDetailsPage.isDisplayedAfterWait()).toBe(true);
        expect(updatedBook).toEqual(expectedUpdatedBookData);
    });
});
