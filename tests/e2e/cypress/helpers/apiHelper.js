import { LibraryMasterApi } from '../api/libraryMasterApi';
import frameworkHelper from './frameworkHelper';

const libraryMasterApi = new LibraryMasterApi();

class ApiHelper {
    createBook(createBookPayload) {
        const userData = frameworkHelper.getUserData();

        return libraryMasterApi.authApi.generateUserToken(userData).then((token) => {
                return libraryMasterApi.booksApi.create(token, createBookPayload).then((book) => {
                    return { book, token };
                });
            });
    }
}

export default new ApiHelper();
