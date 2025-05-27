import { BaseBook } from './BaseBook';
import { BookType } from '../../interfaces/BookType';

export class PrintedBook extends BaseBook {
    constructor(
        title: string,
        author: string,
        year: number,
        isAvailable: boolean = true,
    ) {
        super(title, author, year, isAvailable);
    }

    getType(): BookType {
        return BookType.printed;
    }
}
