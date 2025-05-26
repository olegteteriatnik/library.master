import sinon from 'sinon';
import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from '../helpers/chai';
import { expectErrorFrom } from '../helpers/expectError';
import LibraryService from '../../../server/src/services/LibraryService/LibraryService';
import { BookFactory } from '../../../server/src/factories/BookFactory/BookFactory';
import { BookType } from '../../../server/src/interfaces/BookType';
import { createDatabaseMock, createEventManagerMock } from '../helpers/mocks';

let sandbox: sinon.SinonSandbox;

describe('LibraryService', () => {
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should add a book', async () => {
        const requestPayload = {
            title: 'Test Book',
            author: 'Author Name',
            year: 2025,
            isAvailable: true,
            type: BookType.printed,
        };

        const expectedResponse = {
            id: 1,
            ...requestPayload
        };

        const dbRow = { rows: [expectedResponse] };

        const transportService = {
            query: sandbox.stub()
                .onFirstCall().resolves({ rows: [] })
                .onSecondCall().resolves(dbRow),
        };

        const dbMock = createDatabaseMock(transportService);
        const eventManagerServiceMock = createEventManagerMock();
        const libraryService = new LibraryService(dbMock, eventManagerServiceMock);
        const result = await libraryService.add(requestPayload);

        expect(result).to.deep.equal(expectedResponse);
        expect(transportService.query).to.have.been.calledWithMatch(
            sinon.match.string,
            [
                requestPayload.title,
                requestPayload.author,
                requestPayload.year,
                requestPayload.isAvailable,
                requestPayload.type,
            ],
        );
    });

    it('should add a book and set isAvailable to true when not provided', async () => {
        const requestPayload = {
            title: 'Test Book',
            author: 'Author Name',
            year: 2025,
        };

        const expectedResponse = {
            id: 2,
            ...requestPayload,
            isAvailable: true,
            type: BookType.printed,
        };

        const dbRow = { rows: [expectedResponse] };

        const transportService = {
            query: sandbox.stub()
                .onFirstCall().resolves({ rows: [] })
                .onSecondCall().resolves(dbRow),
        };

        const dbMock = createDatabaseMock(transportService);
        const eventManagerServiceMock = createEventManagerMock();
        const libraryService = new LibraryService(dbMock, eventManagerServiceMock);
        const result = await libraryService.add(requestPayload);

        expect(result).to.deep.equal(expectedResponse);
        expect(transportService.query).to.have.been.calledWithMatch(
            sinon.match.string,
            [
                requestPayload.title,
                requestPayload.author,
                requestPayload.year,
                true,
                BookType.printed,
            ],
        );
    });

    it('should add a book with isAvailable = false when explicitly provided', async () => {
        const requestPayload = {
            title: 'Test Book',
            author: 'Author Name',
            year: 2025,
            isAvailable: false,
            type: BookType.printed,
        };

        const expectedResponse = {
            id: 3,
            ...requestPayload,
        };

        const dbRow = { rows: [expectedResponse] };

        const transportService = {
            query: sandbox.stub()
                .onFirstCall().resolves({ rows: [] })
                .onSecondCall().resolves(dbRow),
        };

        const dbMock = createDatabaseMock(transportService);
        const eventManagerServiceMock = createEventManagerMock();
        const libraryService = new LibraryService(dbMock, eventManagerServiceMock);
        const result = await libraryService.add(requestPayload);

        expect(result).to.deep.equal(expectedResponse);
        expect(transportService.query).to.have.been.calledWithMatch(
            sinon.match.string,
            [
                requestPayload.title,
                requestPayload.author,
                requestPayload.year,
                false,
                requestPayload.type,
            ],
        );
    });

    it('should add a book with empty strings and year = 0', async () => {
        const requestPayload = {
            title: '',
            author: '',
            year: 0,
            isAvailable: true,
            type: BookType.printed,
        };

        const expectedResponse = {
            id: 4,
            ...requestPayload,
        };

        const dbRow = { rows: [expectedResponse] };

        const transportService = {
            query: sandbox.stub()
                .onFirstCall().resolves({ rows: [] })
                .onSecondCall().resolves(dbRow),
        };

        const dbMock = createDatabaseMock(transportService);
        const eventManagerServiceMock = createEventManagerMock();
        const libraryService = new LibraryService(dbMock, eventManagerServiceMock);
        const result = await libraryService.add(requestPayload);

        expect(result).to.deep.equal(expectedResponse);
        expect(transportService.query).to.have.been.calledWithMatch(
            sinon.match.string,
            [
                requestPayload.title,
                requestPayload.author,
                requestPayload.year,
                requestPayload.isAvailable,
                requestPayload.type,
            ],
        );
    });

    it('add a book. should throw when database query fails', async () => {
        const requestPayload = {
            title: 'Test Book',
            author: 'Author Name',
            year: 2025,
            isAvailable: true,
        };

        const dbError = new Error('Database connection lost');
        const transportService = { query: sandbox.stub().rejects(dbError) };
        const dbMock = createDatabaseMock(transportService);
        const eventManagerServiceMock = createEventManagerMock();
        const libraryService = new LibraryService(dbMock, eventManagerServiceMock);

        await expectErrorFrom(
            libraryService.add(requestPayload),
            { message: 'Database connection lost', },
        );
    });

    it('should remove a book by id', async () => {
        const requestPayload = { id: 1 };
        const dbRow = { rowCount: 1, rows: [{}] };
        const transportService = { query: sandbox.stub().resolves(dbRow) };
        const dbMock = createDatabaseMock(transportService);
        const eventManagerServiceMock = createEventManagerMock();
        const libraryService = new LibraryService(dbMock, eventManagerServiceMock);
        const result = await libraryService.remove(requestPayload);

        expect(result).to.be.undefined;
        expect(transportService.query).to.have.been.calledWithMatch(
            sinon.match.string,
            [requestPayload.id],
        );
    });

    it('remove a book. should throw if book with given id does not exist', async () => {
        const requestPayload = { id: 999 };
        const dbRow = { rowCount: 0, rows: [] };
        const transportService = { query: sandbox.stub().resolves(dbRow) };
        const dbMock = createDatabaseMock(transportService);
        const eventManagerServiceMock = createEventManagerMock();
        const libraryService = new LibraryService(dbMock, eventManagerServiceMock);

        await expectErrorFrom(
            libraryService.remove(requestPayload),
            { message: 'Book with id 999 not found' }
        );
    });

    it('remove a book. should throw if database query fails', async () => {
        const requestPayload = { id: 1 };
        const dbError = new Error('Database connection lost');
        const transportService = { query: sandbox.stub().rejects(dbError) };
        const dbMock = createDatabaseMock(transportService);
        const eventManagerServiceMock = createEventManagerMock();
        const libraryService = new LibraryService(dbMock, eventManagerServiceMock);

        await expectErrorFrom(
            libraryService.remove(requestPayload),
            { message: 'Database connection lost' }
        );
    });

    it('should list books with default pagination and no sorting', async () => {
        const countResult = { rows: [{ total: '2' }] };

        const books = [
            { id: 1, title: 'First Test Book', author: 'First Author', year: 2000, isAvailable: true },
            { id: 2, title: 'Second Test Book', author: 'Second Author', year: 2001, isAvailable: false },
        ];

        const booksResult = { rows: books };

        const transportService = {
            query: sandbox.stub()
                .onFirstCall().resolves(countResult)
                .onSecondCall().resolves(booksResult),
        };

        const dbMock = createDatabaseMock(transportService);
        const eventManagerServiceMock = createEventManagerMock();
        const libraryService = new LibraryService(dbMock, eventManagerServiceMock);

        const expectedResponse = {
            total: 2,
            currentPage: 1,
            items: books,
        };

        const result = await libraryService.list({});

        expect(result).to.deep.equal(expectedResponse);
        expect(transportService.query).to.have.been.calledTwice;
        expect(transportService.query).to.have.been.calledWithMatch(
            sinon.match.string, [10, 0] // default pageSize and offset
        );
    });

    it('should list books sorted by a valid field', async () => {
        const requestPayload = { sortBy: 'title' };
        const countResult = { rows: [{ total: '2' }] };

        const books = [
            { id: 1, title: 'A Book', author: 'Author Z', year: 1999, isAvailable: true },
            { id: 2, title: 'B Book', author: 'Author Y', year: 2000, isAvailable: false },
        ];

        const booksResult = { rows: books };

        const transportService = {
            query: sandbox.stub()
                .onFirstCall().resolves(countResult)
                .onSecondCall().resolves(booksResult),
        };

        const dbMock = createDatabaseMock(transportService);
        const eventManagerServiceMock = createEventManagerMock();
        const libraryService = new LibraryService(dbMock, eventManagerServiceMock);

        const expectedResponse = {
            total: 2,
            currentPage: 1,
            items: books,
        };

        const result = await libraryService.list(requestPayload);
        const secondCallArgs = transportService.query.secondCall.args;

        expect(result).to.deep.equal(expectedResponse);
        expect(transportService.query).to.have.been.calledTwice;
        expect(secondCallArgs[0]).to.match(/ORDER BY title/);
        expect(secondCallArgs[1]).to.deep.equal([10, 0]);
    });

    it('should list books with custom pagination', async () => {
        const requestPayload = {
            page: 2,
            pageSize: 5,
        };

        const countResult = { rows: [{ total: '10' }] };

        const books = [
            { id: 6, title: 'Book 6', author: 'Author 6', year: 2006, isAvailable: true },
            { id: 7, title: 'Book 7', author: 'Author 7', year: 2007, isAvailable: false },
        ];

        const booksResult = { rows: books };

        const transportService = {
            query: sandbox.stub()
                .onFirstCall().resolves(countResult)
                .onSecondCall().resolves(booksResult),
        };

        const dbMock = createDatabaseMock(transportService);
        const eventManagerServiceMock = createEventManagerMock();
        const libraryService = new LibraryService(dbMock, eventManagerServiceMock);

        const expectedResponse = {
            total: 10,
            currentPage: 2,
            items: books,
        };

        const result = await libraryService.list(requestPayload);

        expect(result).to.deep.equal(expectedResponse);
        expect(transportService.query).to.have.been.calledTwice;
        expect(transportService.query.secondCall).to.have.been.calledWithMatch(
            sinon.match.string, [5, 5]
        );
    });

    it('books list. should throw if sortBy field is invalid', async () => {
        const requestPayload = {
            sortBy: 'price',
        };

        const transportService = {
            query: sandbox.stub().resolves({rows: [{total: '0'}]}),
        };

        const dbMock = createDatabaseMock(transportService);
        const eventManagerServiceMock = createEventManagerMock();
        const libraryService = new LibraryService(dbMock, eventManagerServiceMock);

        await expectErrorFrom(
            libraryService.list(requestPayload),
            {message: 'price is invalid sort field'},
        );

        expect(transportService.query).to.have.been.calledOnce;
    });

    it('books list. should throw if count query fails', async () => {
        const requestPayload = {
            page: 1,
            pageSize: 10,
        };

        const dbError = new Error('Database connection lost');
        const transportService = { query: sandbox.stub().onFirstCall().rejects(dbError) };
        const dbMock = createDatabaseMock(transportService);
        const eventManagerServiceMock = createEventManagerMock();
        const libraryService = new LibraryService(dbMock, eventManagerServiceMock);

        await expectErrorFrom(
            libraryService.list(requestPayload),
            { message: 'Database connection lost' },
        );

        expect(transportService.query).to.have.been.calledOnce;
    });

    it('books list. should throw if fetching books fails', async () => {
        const requestPayload = {
            page: 1,
            pageSize: 10,
        };

        const dbError = new Error('Failed to fetch books');
        const countResult = { rows: [{ total: '2' }] };

        const transportService = {
            query: sandbox.stub()
                .onFirstCall().resolves(countResult)
                .onSecondCall().rejects(dbError),
        };

        const dbMock = createDatabaseMock(transportService);
        const eventManagerServiceMock = createEventManagerMock();
        const libraryService = new LibraryService(dbMock, eventManagerServiceMock);

        await expectErrorFrom(
            libraryService.list(requestPayload),
            { message: 'Failed to fetch books' },
        );

        expect(transportService.query).to.have.been.calledTwice;
    });

    it('books search. should return books filtered by title', async () => {
        const requestPayload = {
            title: 'Test',
        };

        const books = [
            { id: 1, title: 'Test Book One', author: 'Author A', year: 2000, isAvailable: true },
            { id: 2, title: 'Another Test Book', author: 'Author B', year: 2001, isAvailable: true },
        ];

        const countResult = { rows: [{ total: '2' }] };
        const booksResult = { rows: books };

        const transportService = {
            query: sandbox.stub()
                .onFirstCall().resolves(countResult)
                .onSecondCall().resolves(booksResult),
        };

        const dbMock = createDatabaseMock(transportService);
        const eventManagerServiceMock = createEventManagerMock();
        const libraryService = new LibraryService(dbMock, eventManagerServiceMock);

        const expectedResponse = {
            total: 2,
            currentPage: 1,
            items: books,
        };

        const result = await libraryService.search(requestPayload);
        const secondCallArgs = transportService.query.secondCall.args;

        expect(result).to.deep.equal(expectedResponse);
        expect(transportService.query).to.have.been.calledTwice;
        expect(secondCallArgs[0]).to.match(/ORDER BY title/);
        expect(secondCallArgs[1]).to.deep.equal([
            '%Test%',
            10,
            0,
        ]);
    });

    it('books search. should filter by title, author, year and isAvailable', async () => {
        const requestPayload = {
            title: 'Test',
            author: 'Author',
            year: 2020,
            isAvailable: true,
        };

        const books = [
            {
                id: 1,
                title: 'Test Book',
                author: 'Author',
                year: 2020,
                isAvailable: true,
            },
        ];

        const countResult = { rows: [{ total: '1' }] };
        const booksResult = { rows: books };

        const transportService = {
            query: sandbox.stub()
                .onFirstCall().resolves(countResult)
                .onSecondCall().resolves(booksResult),
        };

        const dbMock = createDatabaseMock(transportService);
        const eventManagerServiceMock = createEventManagerMock();
        const libraryService = new LibraryService(dbMock, eventManagerServiceMock);

        const expectedResponse = {
            total: 1,
            currentPage: 1,
            items: books,
        };

        const result = await libraryService.search(requestPayload);
        const secondCallArgs = transportService.query.secondCall.args;

        expect(result).to.deep.equal(expectedResponse);
        expect(transportService.query).to.have.been.calledTwice;
        expect(secondCallArgs[0]).to.match(/ORDER BY title/);
        expect(secondCallArgs[1]).to.deep.equal([
            '%Test%',
            '%Author%',
            2020,
            true,
            10,
            0,
        ]);
    });

    it('books search. should return all books when no filters are provided', async () => {
        const books = [
            { id: 1, title: 'Book One', author: 'Author A', year: 1999, isAvailable: true },
            { id: 2, title: 'Book Two', author: 'Author B', year: 2005, isAvailable: false },
        ];

        const countResult = { rows: [{ total: '2' }] };
        const booksResult = { rows: books };

        const transportService = {
            query: sandbox.stub()
                .onFirstCall().resolves(countResult)
                .onSecondCall().resolves(booksResult),
        };

        const dbMock = createDatabaseMock(transportService);
        const eventManagerServiceMock = createEventManagerMock();
        const libraryService = new LibraryService(dbMock, eventManagerServiceMock);

        const expectedResponse = {
            total: 2,
            currentPage: 1,
            items: books,
        };

        const result = await libraryService.search({});
        const secondCallArgs = transportService.query.secondCall.args;

        expect(result).to.deep.equal(expectedResponse);
        expect(transportService.query).to.have.been.calledTwice;
        expect(secondCallArgs[0]).to.match(/ORDER BY title/);
        expect(secondCallArgs[1]).to.deep.equal([10, 0]);
    });

    it('books search. should return empty result when no books match filter', async () => {
        const requestPayload = {
            year: 1800,
        };

        const countResult = { rows: [{ total: '0' }] };
        const booksResult = { rows: [] };

        const transportService = {
            query: sandbox.stub()
                .onFirstCall().resolves(countResult)
                .onSecondCall().resolves(booksResult),
        };

        const dbMock = createDatabaseMock(transportService);
        const eventManagerServiceMock = createEventManagerMock();
        const libraryService = new LibraryService(dbMock, eventManagerServiceMock);

        const expectedResponse = {
            total: 0,
            currentPage: 1,
            items: [],
        };

        const result = await libraryService.search(requestPayload);

        expect(result).to.deep.equal(expectedResponse);
        expect(transportService.query).to.have.been.calledTwice;
        expect(transportService.query.secondCall.args[1]).to.deep.equal([
            1800,
            10,
            0,
        ]);
    });

    it('books search. should throw if count query fails', async () => {
        const requestPayload = {
            title: 'Any Book',
        };

        const dbError = new Error('Database connection lost');

        const transportService = {
            query: sandbox.stub().onFirstCall().rejects(dbError),
        };

        const dbMock = createDatabaseMock(transportService);
        const eventManagerServiceMock = createEventManagerMock();
        const libraryService = new LibraryService(dbMock, eventManagerServiceMock);

        await expectErrorFrom(
            libraryService.search(requestPayload),
            { message: 'Database connection lost' },
        );

        expect(transportService.query).to.have.been.calledOnce;
    });

    it('books search. should throw if books query fails after count succeeds', async () => {
        const requestPayload = {
            title: 'Test Book',
        };

        const countResult = { rows: [{ total: '5' }] };
        const dbError = new Error('Failed to fetch books');

        const transportService = {
            query: sandbox.stub()
                .onFirstCall().resolves(countResult)
                .onSecondCall().rejects(dbError),
        };

        const dbMock = createDatabaseMock(transportService);
        const eventManagerServiceMock = createEventManagerMock();
        const libraryService = new LibraryService(dbMock, eventManagerServiceMock);

        await expectErrorFrom(
            libraryService.search(requestPayload),
            { message: 'Failed to fetch books' },
        );

        expect(transportService.query).to.have.been.calledTwice;
    });

    it('checkAvailability. should return availability true for existing book', async () => {
        const bookId = 1;
        const dbRow = { rows: [{ isAvailable: true }] };
        const transportService = { query: sandbox.stub().resolves(dbRow) };
        const dbMock = createDatabaseMock(transportService);
        const eventManagerServiceMock = createEventManagerMock();
        const libraryService = new LibraryService(dbMock, eventManagerServiceMock);

        const expectedResponse = {
            id: bookId,
            isAvailable: true,
        };

        const result = await libraryService.checkAvailability(bookId);

        expect(result).to.deep.equal(expectedResponse);
        expect(transportService.query).to.have.been.calledWithMatch(
            sinon.match.string,
            [bookId]
        );
    });

    it('checkAvailability. should return availability false for existing book', async () => {
        const bookId = 2;
        const dbRow = { rows: [{ isAvailable: false }] };
        const transportService = { query: sandbox.stub().resolves(dbRow) };
        const dbMock = createDatabaseMock(transportService);
        const eventManagerServiceMock = createEventManagerMock();
        const libraryService = new LibraryService(dbMock, eventManagerServiceMock);

        const expectedResponse = {
            id: bookId,
            isAvailable: false,
        };

        const result = await libraryService.checkAvailability(bookId);

        expect(result).to.deep.equal(expectedResponse);
        expect(transportService.query).to.have.been.calledWithMatch(
            sinon.match.string,
            [bookId]
        );
    });

    it('checkAvailability. should throw if book with given id does not exist', async () => {
        const bookId = 999;
        const dbRow = { rows: [] };
        const transportService = { query: sandbox.stub().resolves(dbRow) };
        const dbMock = createDatabaseMock(transportService);
        const eventManagerServiceMock = createEventManagerMock();
        const libraryService = new LibraryService(dbMock, eventManagerServiceMock);

        await expectErrorFrom(
            libraryService.checkAvailability(bookId),
            { message: `Book with id ${bookId} not found.` }
        );

        expect(transportService.query).to.have.been.calledWithMatch(
            sinon.match.string,
            [bookId]
        );
    });

    it('checkAvailability. should throw if database query fails', async () => {
        const bookId = 1;
        const dbError = new Error('Database connection failed');
        const transportService = { query: sandbox.stub().rejects(dbError) };
        const dbMock = createDatabaseMock(transportService);
        const eventManagerServiceMock = createEventManagerMock();
        const libraryService = new LibraryService(dbMock, eventManagerServiceMock);

        await expectErrorFrom(
            libraryService.checkAvailability(bookId),
            { message: 'Database connection failed' }
        );

        expect(transportService.query).to.have.been.calledWithMatch(
            sinon.match.string,
            [bookId]
        );
    });

    it('getById. should return book when found', async () => {
        const bookId = 42;
        const expectedBook = {
            id: bookId,
            title: 'Test Book',
            author: 'Author X',
            year: 2024,
            isAvailable: true,
        };

        const dbRow = { rows: [expectedBook] };
        const transportService = { query: sandbox.stub().resolves(dbRow) };

        const dbMock = createDatabaseMock(transportService);
        const eventManagerServiceMock = createEventManagerMock();
        const libraryService = new LibraryService(dbMock, eventManagerServiceMock);

        const result = await libraryService.getById(bookId);

        expect(result).to.deep.equal(expectedBook);
        expect(transportService.query).to.have.been.calledWithMatch(
            sinon.match.string,
            [bookId]
        );
    });

    it('getById. should throw if book with given id does not exist', async () => {
        const bookId = 999;
        const dbRow = { rows: [] };
        const transportService = { query: sandbox.stub().resolves(dbRow) };

        const dbMock = createDatabaseMock(transportService);
        const eventManagerServiceMock = createEventManagerMock();
        const libraryService = new LibraryService(dbMock, eventManagerServiceMock);

        await expectErrorFrom(
            libraryService.getById(bookId),
            { message: `Book with id ${bookId} not found` }
        );

        expect(transportService.query).to.have.been.calledWithMatch(
            sinon.match.string,
            [bookId]
        );
    });

    it('getById. should throw if database query fails', async () => {
        const bookId = 1;
        const dbError = new Error('Database connection lost');
        const transportService = { query: sandbox.stub().rejects(dbError) };

        const dbMock = createDatabaseMock(transportService);
        const eventManagerServiceMock = createEventManagerMock();
        const libraryService = new LibraryService(dbMock, eventManagerServiceMock);

        await expectErrorFrom(
            libraryService.getById(bookId),
            { message: 'Database connection lost' }
        );

        expect(transportService.query).to.have.been.calledWithMatch(
            sinon.match.string,
            [bookId]
        );
    });

    it('update. should update only the author field', async () => {
        const bookId = 1;
        const existingBook = {
            id: bookId,
            title: 'Old Title',
            author: 'Old Author',
            year: 2000,
            isAvailable: true,
            type: BookType.printed,
        };

        const updatedAuthor = 'New Author';

        const expectedResult = {
            ...existingBook,
            author: updatedAuthor,
        };

        const dbRow = { rows: [expectedResult] };

        const transportService = {
            query: sandbox.stub()
                .onFirstCall().resolves({ rows: [existingBook] })
                .onSecondCall().resolves(dbRow),
        };

        const dbMock = createDatabaseMock(transportService);
        const eventManagerServiceMock = createEventManagerMock();
        const libraryService = new LibraryService(dbMock, eventManagerServiceMock);

        const result = await libraryService.update({
            id: bookId,
            author: updatedAuthor,
        });

        expect(result).to.deep.equal(expectedResult);
        expect(transportService.query).to.have.been.calledTwice;
        expect(transportService.query.secondCall.args[1]).to.deep.equal([
            existingBook.title,
            updatedAuthor,
            existingBook.year,
            existingBook.isAvailable,
            existingBook.type,
            bookId,
        ]);
    });

    it('update. should update only the isAvailable field', async () => {
        const bookId = 2;
        const existingBook = {
            id: bookId,
            title: 'Some Book',
            author: 'Author',
            year: 2010,
            isAvailable: true,
            type: BookType.printed,
        };

        const expectedResult = {
            ...existingBook,
            isAvailable: false,
        };

        const dbRow = { rows: [expectedResult] };

        const transportService = {
            query: sandbox.stub()
                .onFirstCall().resolves({ rows: [existingBook] })
                .onSecondCall().resolves(dbRow),
        };

        const dbMock = createDatabaseMock(transportService);
        const eventManagerServiceMock = createEventManagerMock();
        const libraryService = new LibraryService(dbMock, eventManagerServiceMock);

        const result = await libraryService.update({
            id: bookId,
            isAvailable: false,
        });

        expect(result).to.deep.equal(expectedResult);
        expect(transportService.query.secondCall.args[1]).to.deep.equal([
            existingBook.title,
            existingBook.author,
            existingBook.year,
            false,
            existingBook.type,
            bookId,
        ]);
    });

    it('update. should update all fields', async () => {
        const bookId = 3;
        const existingBook = {
            id: bookId,
            title: 'Original Title',
            author: 'Original Author',
            year: 1999,
            isAvailable: false,
            type: BookType.printed,
        };

        const updatePayload = {
            id: bookId,
            title: 'Updated Title',
            author: 'Updated Author',
            year: 2025,
            isAvailable: true,
            type: BookType.audiobook,
        };

        const dbRow = { rows: [updatePayload] };

        const transportService = {
            query: sandbox.stub()
                .onFirstCall().resolves({ rows: [existingBook] })
                .onSecondCall().resolves(dbRow),
        };

        const dbMock = createDatabaseMock(transportService);
        const eventManagerServiceMock = createEventManagerMock();
        const libraryService = new LibraryService(dbMock, eventManagerServiceMock);

        const result = await libraryService.update(updatePayload);

        expect(result).to.deep.equal(updatePayload);
        expect(transportService.query.secondCall.args[1]).to.deep.equal([
            updatePayload.title,
            updatePayload.author,
            updatePayload.year,
            updatePayload.isAvailable,
            updatePayload.type,
            bookId,
        ]);
    });

    it('update. should throw if book with given id does not exist', async () => {
        const bookId = 999;

        const transportService = {
            query: sandbox.stub().resolves({ rows: [] }),
        };

        const dbMock = createDatabaseMock(transportService);
        const eventManagerServiceMock = createEventManagerMock();
        const libraryService = new LibraryService(dbMock, eventManagerServiceMock);

        await expectErrorFrom(
            libraryService.update({ id: bookId, title: 'New Title' }),
            { message: `Book with id ${bookId} not found` }
        );

        expect(transportService.query).to.have.been.calledOnce;
        expect(transportService.query).to.have.been.calledWithMatch(
            sinon.match.string,
            [bookId]
        );
    });

    it('update. should throw if update query fails', async () => {
        const bookId = 4;
        const existingBook = {
            id: bookId,
            title: 'Some Title',
            author: 'Some Author',
            year: 2000,
            isAvailable: true,
        };

        const dbError = new Error('Update failed');

        const transportService = {
            query: sandbox.stub()
                .onFirstCall().resolves({ rows: [existingBook] })
                .onSecondCall().rejects(dbError),
        };

        const dbMock = createDatabaseMock(transportService);
        const eventManagerServiceMock = createEventManagerMock();
        const libraryService = new LibraryService(dbMock, eventManagerServiceMock);

        await expectErrorFrom(
            libraryService.update({ id: bookId, year: 2024 }),
            { message: 'Update failed' }
        );

        expect(transportService.query).to.have.been.calledTwice;
    });

    it('book factory. should create a PrintedBook with correct db values', () => {
        const book = BookFactory.create({
            title: 'Printed Title',
            author: 'Printed Author',
            year: 2020,
            type: BookType.printed,
            isAvailable: false,
        });

        expect(book.getType()).to.equal(BookType.printed);
        expect(book.getAvailability()).to.be.false;
        expect(book.toDbValues()).to.deep.equal([
            'Printed Title',
            'Printed Author',
            2020,
            false,
            'printed',
        ]);
    });

    it('book factory. should throw for PrintedBook without author', () => {
        expect(() =>
            BookFactory.create({
                title: 'No Author Book',
                year: 2020,
                type: BookType.printed,
            })
        ).to.throw('PrintedBook must have an author');
    });

    it('book factory. should create an EBook with default availability', () => {
        const book = BookFactory.create({
            title: 'E-Title',
            author: 'E-Author',
            year: 2022,
            type: BookType.ebook,
        });

        expect(book.getType()).to.equal(BookType.ebook);
        expect(book.getAvailability()).to.be.true;
        expect(book.toDbValues()).to.deep.equal([
            'E-Title',
            'E-Author',
            2022,
            true,
            'ebook',
        ]);
    });

    it('book factory. should throw for EBook without author', () => {
        expect(() =>
            BookFactory.create({
                title: 'E-Book No Author',
                year: 2022,
                type: BookType.ebook,
            })
        ).to.throw('EBook must have an author');
    });

    it('book factory. should create an AudioBook and use fallback author if not provided', () => {
        const book = BookFactory.create({
            title: 'Audio Title',
            year: 2021,
            type: BookType.audiobook,
        });

        expect(book.getType()).to.equal(BookType.audiobook);
        expect(book.getAuthor()).to.equal('Narrated version');
        expect(book.toDbValues()).to.deep.equal([
            'Audio Title',
            'Narrated version',
            2021,
            true,
            'audiobook',
        ]);
    });
});
