import { BaseBook } from './BaseBook';
import { BookType } from '../../interfaces/BookType';

export class EBook extends BaseBook {
    constructor(
        title: string,
        author: string,
        year: number,
    ) {
        super(title, author, year, true);
    }

    getType(): BookType {
        return BookType.ebook;
    }
}
