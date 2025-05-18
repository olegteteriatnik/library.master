import { AddBookPayload } from '../../pages/interfaces/AddBookPayload';
import { BookEntity } from '../../api/services/booksApi/interfaces/BookEntity';
import { BookType } from '../../api/services/booksApi/interfaces/BookType';

const book: AddBookPayload = {
    title: `Add Book Title ${new Date(Date.now()).toISOString()}`,
    author: `Add Book Author ${new Date(Date.now()).toISOString()}`,
    year: new Date().getFullYear(),
};

function generateExpectedBookData(id: number): BookEntity {
    return {
        id,
        title: book.title,
        author: book.author,
        year: book.year,
        isAvailable: true,
        type: BookType.printed,
    }
}

export default {
    book,
    generateExpectedBookData,
}
