import { BookPrototype } from '../../prototypes/BookPrototype';
import texts from '../../texts';

const bookData = {
    title: 'Book Details page content Title',
    author: 'Book Details page content Author',
};

const createBookPayload = new BookPrototype(bookData);
const expectedAuthorFieldContent = `${texts.bookDetails.author}: ${createBookPayload.author}`;
const expectedYearFieldContent = `${texts.bookDetails.year}: ${createBookPayload.year}`;

export default {
    createBookPayload,
    expectedAuthorFieldContent,
    expectedYearFieldContent,
};
