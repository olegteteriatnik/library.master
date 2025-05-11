import { Book } from './interfaces/Book';
import { BookType } from '../../interfaces/BookType';

export class EBook implements Book {
    constructor(
        private title: string,
        private author: string,
        private year: number,
    ) {}

    getTitle(): string {
        return this.title;
    }

    getAuthor(): string {
        return this.author;
    }

    getYear(): number {
        return this.year;
    }

    getAvailability(): boolean {
        return true;
    }

    getType(): BookType {
        return BookType.ebook;
    }

    toDbValues(): [string, string, number, boolean, string] {
        return [this.title, this.author, this.year, this.getAvailability(), this.getType()];
    }
}
