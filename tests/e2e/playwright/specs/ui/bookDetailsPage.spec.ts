import { test, expect } from '@playwright/test';
import commonHelper from '../../helpers/commonHelper';
import frameworkHelper from '../../helpers/frameworkHelper';
import { LibraryMasterApi } from '../../api/libraryMasterApi';
import BookDetailsPage from '../../pages/BookDetailsPage';
import { BookEntity } from '../../api/services/booksApi/interfaces/BookEntity';
import data from '../../data/ui/bookDetailsPage';
import texts from '../../texts';

const libraryMasterApi = new LibraryMasterApi();
const {
    createBookPayload,
    expectedAuthorFieldContent,
    expectedYearFieldContent,
} = data;

let userAccessToken: string;
let book: BookEntity;

test.describe('Books Details page is displayed correctly', () => {
    test.beforeAll(async () => {
        const userData = await commonHelper.getUserData();
        userAccessToken = await libraryMasterApi.authApi.generateUserToken(userData);
        book = await libraryMasterApi.booksApi.create(userAccessToken, createBookPayload);
    });

    test.afterAll(async () => {
        await libraryMasterApi.booksApi.delete(userAccessToken, book.id);
    });

    test('@T267db73c Books Details page is displayed.', async ({ page }) => {
        const bookDetailsPage = new BookDetailsPage(page, book.id);
        await frameworkHelper.setUserAccessToken(page, userAccessToken);
        const isBookAvailable = commonHelper.booleanToYesNo(book.isAvailable);
        await bookDetailsPage.visit();

        expect(await bookDetailsPage.isHeaderDisplayed()).toBe(true);
        expect(await bookDetailsPage.getHeaderTitle()).toBe(texts.bookDetails.headerTitle);
        expect(await bookDetailsPage.isBackToListButtonDisplayed()).toBe(true);
        expect(await bookDetailsPage.getBackToListButtonName()).toBe(texts.bookDetails.backToListButtonName);
        expect(await bookDetailsPage.isLogoutButtonDisplayed()).toBe(true);
        expect(await bookDetailsPage.getLogoutButtonName()).toBe(texts.bookDetails.logoutButtonName);
        expect(await bookDetailsPage.isBookDetailsSectionDisplayed()).toBe(true);
        expect(await bookDetailsPage.isBookTitleDisplayed()).toBe(true);
        expect(await bookDetailsPage.getBookTitle()).toBe(book.title);
        expect(await bookDetailsPage.isBookAuthorDisplayed()).toBe(true);
        expect(await bookDetailsPage.getBookAuthor()).toBe(expectedAuthorFieldContent);
        expect(await bookDetailsPage.isBookYearDisplayed()).toBe(true);
        expect(await bookDetailsPage.getBookYear()).toBe(expectedYearFieldContent);
        expect(await bookDetailsPage.isBookAvailabilityDisplayed()).toBe(true);
        expect(await bookDetailsPage.getBookAvailability()).toBe(`${texts.bookDetails.availability}: ${isBookAvailable}`);
        expect(await bookDetailsPage.isEditButtonDisplayed()).toBe(true);
        expect(await bookDetailsPage.getEditButtonName()).toBe(texts.bookDetails.editButtonName);
        expect(await bookDetailsPage.isDeleteButtonDisplayed()).toBe(true);
        expect(await bookDetailsPage.getDeleteButtonName()).toBe(texts.bookDetails.deleteButtonName);
    });
});
