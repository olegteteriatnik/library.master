import { LibraryMasterApi } from '../api/libraryMasterApi';
import { BooksListPage } from '../pages/BooksListPage';
import { AddBookModal } from '../pages/fragments/AddBookModal';
import staticParams from '../params/constants';

const libraryMasterApi = new LibraryMasterApi();
const booksListPage = new BooksListPage();
const addBookModal = new AddBookModal();

let userAccessToken;

Cypress.Commands.add('loginAndVisitBooksListPage', () => {
    cy.task('getSecret', 'authUser').then((userData) => {
        libraryMasterApi.authApi.generateUserToken(userData).then((token) => {
            cy.visit(staticParams.routes.booksList, {
                onBeforeLoad(win) {
                    win.localStorage.setItem('token', token);
                },
            });

            return cy.wrap(token);
        });
    });
});

Cypress.Commands.add('waitForBookToBeCreated', (token, title) => {
    const timeout = staticParams.timeouts.bookCreation.timeout;
    const interval = staticParams.timeouts.bookCreation.interval;
    const start = Date.now();

    function poll() {
        return libraryMasterApi.booksApi.search(token, { title }).then((response) => {
            const [book] = response.items;

            if (book) {
                return cy.wrap(book);
            }

            if (Date.now() - start > timeout) {
                throw new Error(`Book with title "${title}" was not found within ${timeout}ms`);
            }

            return Cypress.Promise.delay(interval).then(poll);
        });
    }

    return poll();
});

Cypress.Commands.add('addBookOnListPage', (bookData) => {
    cy.task('getSecret', 'authUser').then((userData) => {
        libraryMasterApi.authApi.generateUserToken(userData).then((token) => {
            userAccessToken = token;

            cy.visit(staticParams.routes.booksList, {
                onBeforeLoad(win) {
                    win.localStorage.setItem('token', token);
                },
            });

            booksListPage.waitUntilIsOpened();
            booksListPage.clickAddNewBookButton();
            addBookModal.waitUntilIsOpened();
            addBookModal.fillForm(bookData);
            addBookModal.clickAddButton();

            cy.waitForBookToBeCreated(token, bookData.title).then((book) => {
                cy.wrap(book).as('createdBook');
            });
        });
    });
});

Cypress.Commands.add('deleteCreatedBook', () => {
    cy.get('@createdBook').then((createdBook) => {
        libraryMasterApi.booksApi.delete(userAccessToken, createdBook.id);
    });
});
