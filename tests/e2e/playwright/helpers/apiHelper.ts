import { Page } from '@playwright/test';
import { LibraryMasterApi } from '../api/libraryMasterApi';
import { UserData } from '../api/services/authApi/interfaces/UserData';
import { BookEntity } from '../api/services/booksApi/interfaces/BookEntity';
import frameworkHelper from './frameworkHelper';
import staticParams from '../params/constants';

const libraryMasterApi = new LibraryMasterApi();

class ApiHelper {
    public async signInToLibraryMasterApp(page: Page, userData: UserData): Promise<string> {
        const token = await libraryMasterApi.authApi.generateUserToken(userData);
        await frameworkHelper.setUserAccessToken(page, token);

        return token;
    }

    public async findBookByTitle(userAccessToken: string, title: string): Promise<BookEntity> {
        const [foundBook] = (await libraryMasterApi.booksApi.search(userAccessToken, { title })).items;

        return foundBook;
    }

    public async waitForBookToBeCreated(userAccessToken: string, title: string): Promise<BookEntity> {
        const startTime = Date.now();
        const timeout = staticParams.timeouts.bookCreation.timeout;
        const interval = staticParams.timeouts.bookCreation.interval;

        while (Date.now() - startTime < timeout) {
            const book = await this.findBookByTitle(userAccessToken, title);

            if (book) {
                return book;
            }
            await new Promise((resolve) => setTimeout(resolve, interval));
        }
        throw  new Error(`Book with title "${title}" was not found within ${timeout}ms`);
    }
}

export default new ApiHelper();