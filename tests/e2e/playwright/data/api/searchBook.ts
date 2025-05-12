import { BookPrototype } from '../../prototypes/BookPrototype';
import { BookEntity } from '../../api/services/booksApi/interfaces/BookEntity';
import { BooksList } from '../../api/services/booksApi/interfaces/BooksList';
import { BookType } from '../../api/services/booksApi/interfaces/BookType';

const bookData = {
    title: 'API. Find Book by id Title',
    author: 'API. Find Book by id Author',
};

const createBookPayload = new BookPrototype(bookData);

function generateBookDataResult(id: number): BookEntity {
    return {
        id,
        title: createBookPayload.title,
        author: createBookPayload.author,
        year: createBookPayload.year,
        isAvailable: true,
        type: BookType.printed,
    };
}

function generateExpectedFindBookByTitleResult(id: number): BooksList {
    return {
        total: 1,
        currentPage: 1,
        items: [generateBookDataResult(id)],
    };
}

export default {
    createBookPayload,
    generateExpectedFindBookByTitleResult,
};
