import { Book } from './interfaces/Book';
import { BookType } from '../../interfaces/BookType';

export class PrintedBook implements Book {
    constructor(
        private title: string,
        private author: string,
        private year: number,
        private isAvailable: boolean = true,
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
        return this.isAvailable;
    }

    getType(): BookType {
        return BookType.printed;
    }

    toDbValues(): [string, string, number, boolean, string] {
        return [this.title, this.author, this.year, this.isAvailable, this.getType()];
    }
}
