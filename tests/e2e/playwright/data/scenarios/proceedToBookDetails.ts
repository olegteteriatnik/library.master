import { BookPrototype } from '../../prototypes/BookPrototype';

const bookData = {
    title: 'Proceed from list Book Title',
    author: 'Proceed from list Book Author',
};

const createBookPayload = new BookPrototype(bookData);

export default {
    createBookPayload,
}
