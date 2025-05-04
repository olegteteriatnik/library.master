import { test, expect } from '@playwright/test';
import commonHelper from '../../helpers/commonHelper';
import { LibraryMasterApi } from '../../api/libraryMasterApi';

const libraryMasterApi = new LibraryMasterApi();

test.describe('Generate user access token cases.', () => {
    test('@T1bb0f04d User access token could be generated.', async () => {
        const userData = await commonHelper.getUserData();
        const generatedUserAccessToken = await libraryMasterApi.authApi.generateUserToken(userData);

        expect(generatedUserAccessToken).toBeDefined();
        expect(commonHelper.isTokenValid(generatedUserAccessToken)).toBe(true);
    });
});
