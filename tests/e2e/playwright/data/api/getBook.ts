import { BookPrototype } from '../../prototypes/BookPrototype';
import { BookEntity } from '../../api/services/booksApi/interfaces/BookEntity';
import { BookType } from '../../api/services/booksApi/interfaces/BookType';

const bookData = {
    title: 'API. Get Book Title',
    author: 'API. Get Book Author',
};

const createBookPayload = new BookPrototype(bookData);

function generateExpectedGetBookResponse(id: number): BookEntity {
    return {
        id,
        title: createBookPayload.title,
        author: createBookPayload.author,
        year: createBookPayload.year,
        isAvailable: true,
        type: BookType.printed,
    };
}

export default {
    createBookPayload,
    generateExpectedGetBookResponse,
};
