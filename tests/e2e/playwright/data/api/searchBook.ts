import { CreateBookPayload } from '../../api/services/booksApi/interfaces/CreateBookPayload';
import { BookEntity } from '../../api/services/booksApi/interfaces/BookEntity';
import { BooksList } from '../../api/services/booksApi/interfaces/BooksList';
import { BookType } from '../../api/services/booksApi/interfaces/BookType';

const createBookPayload: CreateBookPayload = {
    title: `API. Find Book by id Title ${new Date(Date.now()).toISOString()}`,
    author: `API. Find Book by id Author ${new Date(Date.now()).toISOString()}`,
    year: new Date().getFullYear(),
};

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
