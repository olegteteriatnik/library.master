import { BooksListPage } from '../../pages/BooksListPage';
import { AddBookModal } from '../../pages/fragments/AddBookModal.js';
import frameworkHelper from '../../helpers/frameworkHelper';
import data from '../../data/scenarios/addNewBook';
import assertions from '../../assertions/scenarios/addNewBook';

const booksListPage = new BooksListPage();
const addBookModal = new AddBookModal();
const { bookData } = data;
const { assertCreatedBookMatchesExpected } = assertions;

describe('Add new book cases', () => {
    before(() => {
        frameworkHelper.addBookOnListPage(bookData);
    });

    after(() => {
        frameworkHelper.deleteCreatedBook();
    });

    it('It could be possible to add new book.', () => {
        addBookModal.assertIsHiddenAfterWait();
        booksListPage.assertDisplayedAfterWait();
        assertCreatedBookMatchesExpected();
    });
});
