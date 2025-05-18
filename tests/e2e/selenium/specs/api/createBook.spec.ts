import commonHelper from '../../helpers/commonHelper';
import { LibraryMasterApi } from '../../api/libraryMasterApi';
import { BookEntity } from '../../api/services/booksApi/interfaces/BookEntity';
import data from '../../data/api/createBook';

const libraryMasterApi = new LibraryMasterApi();
const { createBookPayload, expectedCreateBookResponse } = data;

let userAccessToken: string;
let createBookResult: BookEntity;

describe('Book entity create cases.', () => {
    beforeAll(async () => {
        const userData = await commonHelper.getUserData();
        userAccessToken = await libraryMasterApi.authApi.generateUserToken(userData);
        createBookResult = await libraryMasterApi.booksApi.create(userAccessToken, createBookPayload);
    });

    afterAll(async () => {
        await libraryMasterApi.booksApi.delete(userAccessToken, createBookResult.id);
    });

    test('Book entity could be created.', async () => {
        expect(createBookResult).toStrictEqual(expectedCreateBookResponse);
    });
});
