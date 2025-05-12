import { BookPrototype } from '../../prototypes/BookPrototype';

const bookData = {
    title: 'Search Book Title',
    author: 'Search Book Author',
};

const createBookPayload = new BookPrototype(bookData);

export default {
    createBookPayload,
}
