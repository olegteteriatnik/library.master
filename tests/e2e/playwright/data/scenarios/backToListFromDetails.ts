import { BookPrototype } from '../../prototypes/BookPrototype';

const bookData = {
    title: 'Edit Book on details page Title',
    author: 'Edit Book on details page Author',
};

const createBookPayload = new BookPrototype(bookData);

export default {
    createBookPayload,
};
