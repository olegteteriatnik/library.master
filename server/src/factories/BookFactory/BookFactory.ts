import { Book } from './interfaces/Book';
import { PrintedBook } from './PrintedBook';
import { EBook } from './EBook';
import { AudioBook } from './AudioBook';
import { CreateBookParams } from '../../interfaces/CreateBookParams';
import { BookType } from '../../interfaces/BookType';

export class BookFactory {
    static create(data: CreateBookParams): Book {
        const {
            title,
            author,
            year,
            isAvailable = true,
            type = BookType.printed,
        } = data;

        switch (type) {
            case BookType.ebook:
                if (author === undefined) throw new Error('EBook must have an author');
                return new EBook(title, author, year);
            case BookType.audiobook:
                return new AudioBook(title, author, year, isAvailable);
            case BookType.printed:
            default:
                if (author === undefined) throw new Error('PrintedBook must have an author');
                return new PrintedBook(title, author, year, isAvailable);
        }
    }
}
