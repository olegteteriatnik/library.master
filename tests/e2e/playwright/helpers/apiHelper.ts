import { Page } from '@playwright/test';
import { LibraryMasterApi } from '../api/libraryMasterApi';
import { UserData } from '../api/services/authApi/interfaces/UserData';
import staticParams from '../params/constants';

const libraryMasterApi = new LibraryMasterApi();

class ApiHelper {
    public async signInToLibraryMasterApp(page: Page, userData: UserData): Promise<void> {
        const token = await libraryMasterApi.authApi.generateUserToken(userData);
        await page.goto(staticParams.baseUrl);

        await page.evaluate((tokenValue) => {
            localStorage.setItem('token', tokenValue);
        }, token);
    }
}

export default new ApiHelper();