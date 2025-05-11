import { Book } from './interfaces/Book';
import { BookType } from '../../interfaces/BookType';

export class AudioBook implements Book {
    constructor(
        private title: string,
        private author: string | undefined,
        private year: number,
        private isAvailable: boolean = true,
    ) {}

    getTitle(): string {
        return this.title;
    }

    getAuthor(): string {
        return this.author || 'Narrated version';
    }

    getYear(): number {
        return this.year;
    }

    getAvailability(): boolean {
        return this.isAvailable;
    }

    getType(): BookType {
        return BookType.audiobook;
    }

    toDbValues(): [string, string, number, boolean, string] {
        return [this.title, this.getAuthor(), this.year, this.isAvailable, this.getType()];
    }
}
