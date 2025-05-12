import { BookPrototype } from '../../prototypes/BookPrototype';

const bookData = {
    title: 'API. Delete Book Title',
    author: 'API. Delete Book Author',
};

const createBookPayload = new BookPrototype(bookData);

export default {
    createBookPayload,
};
