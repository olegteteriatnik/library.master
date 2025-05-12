import { BookPrototype } from '../../prototypes/BookPrototype';
import { BookType } from '../../api/services/booksApi/interfaces/BookType';
import commonHelper from '../../helpers/commonHelper';

const initialBookData = {
    title: 'API. Update Book Title',
    author: 'API. Update Book Author',
};

const updateBookData = {
    title: 'API. Updated result Book Title',
    author: 'API. Updated result Book Author',
    year: commonHelper.getRandomYear(),
    isAvailable: false,
};

const createBookPayload = new BookPrototype(initialBookData);
const updatedBookFields = new BookPrototype(updateBookData);

function generateUpdateBookPayloadAndExpectedResult(id: number) {
    return {
        id,
        type: BookType.printed,
        ...updatedBookFields,
    };
}

export default {
    createBookPayload,
    generateUpdateBookPayloadAndExpectedResult,
};
