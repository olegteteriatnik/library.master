import { BookPrototype } from '../../prototypes/BookPrototype';

const bookData = {
    title: 'API. Check Book availability Title',
    author: 'API. Check Book availability Author',
    isAvailable: true,
};

const createBookPayload = new BookPrototype(bookData);

export default {
    createBookPayload,
};
