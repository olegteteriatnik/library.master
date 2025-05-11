import { LibraryMasterApi } from '../../api/libraryMasterApi';
import apiHelper from '../../helpers/apiHelper';
import data from '../../data/api/createBook';
import BookTypeEnum from '../../params/constants/bookTypeEnum';

const libraryMasterApi = new LibraryMasterApi();
const { createBookPayload } = data;

let userAccessToken;
let createBookResult;

describe('Book entity create cases.', () => {
    before(() => {
        return apiHelper.createBook(createBookPayload).then(({ book, token }) => {
            userAccessToken = token;
            createBookResult = book;
        });
    });

    after(() => {
        return libraryMasterApi.booksApi.delete(userAccessToken, createBookResult.id);
    });

    it('Book entity could be created.', () => {
        expect(createBookResult.title).to.equal(createBookPayload.title);
        expect(createBookResult.author).to.equal(createBookPayload.author);
        expect(createBookResult.year).to.equal(createBookPayload.year);
        expect(createBookResult.isAvailable).to.be.true;
        expect(createBookResult.type).to.equal(BookTypeEnum.printed);
    });
});