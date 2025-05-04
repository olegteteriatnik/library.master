import { CreateBookPayload } from '../../api/services/booksApi/interfaces/CreateBookPayload';
import texts from '../../texts';

const createBookPayload: CreateBookPayload = {
    title: `Book Details page content Title ${new Date(Date.now()).toISOString()}`,
    author: `Book Details page content Author ${new Date(Date.now()).toISOString()}`,
    year: new Date().getFullYear(),
};

const expectedAuthorFieldContent = `${texts.bookDetails.author}: ${createBookPayload.author}`;
const expectedYearFieldContent = `${texts.bookDetails.year}: ${createBookPayload.year}`;

export default {
    createBookPayload,
    expectedAuthorFieldContent,
    expectedYearFieldContent,
};
