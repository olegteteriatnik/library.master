import { test, expect } from '@playwright/test';
import commonHelper from '../../helpers/commonHelper';
import { LibraryMasterApi } from '../../api/libraryMasterApi';
import data from '../../data/api/booksList';

const libraryMasterApi = new LibraryMasterApi();
const { booksListFilters, expectedBooksListResult } = data;

test.describe('Books list get cases.', () => {
    test('@Ta76253ee Book list could be returned.', async () => {
        const userData = await commonHelper.getUserData();
        const userAccessToken = await libraryMasterApi.authApi.generateUserToken(userData);
        const booksListResult = await libraryMasterApi.booksApi.list(userAccessToken, booksListFilters);

        expect(booksListResult).toMatchObject(expectedBooksListResult);
    });
});
