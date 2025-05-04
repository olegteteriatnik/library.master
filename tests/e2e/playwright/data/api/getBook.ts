import { CreateBookPayload } from '../../api/services/booksApi/interfaces/CreateBookPayload';
import { BookEntity } from '../../api/services/booksApi/interfaces/BookEntity';

const createBookPayload: CreateBookPayload = {
    title: `API. Get Book Title ${new Date(Date.now()).toISOString()}`,
    author: `API. Get Book Author ${new Date(Date.now()).toISOString()}`,
    year: new Date().getFullYear(),
};

function generateExpectedGetBookResponse(id: number): BookEntity {
    return {
        id,
        title: createBookPayload.title,
        author: createBookPayload.author,
        year: createBookPayload.year,
        isAvailable: true,
    };
}

export default {
    createBookPayload,
    generateExpectedGetBookResponse,
};
