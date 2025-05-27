import { Book } from './interfaces/Book';
import { BookType } from '../../interfaces/BookType';

export abstract class BaseBook implements Book {
    protected constructor(
        protected title: string,
        protected author: string,
        protected year: number,
        protected isAvailable: boolean,
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

    protected getCommonDbValues(): [string, string, number, boolean] {
        return [this.title, this.author, this.year, this.isAvailable];
    }

    abstract getType(): BookType;

    toDbValues(): [string, string, number, boolean, string] {
        return [...this.getCommonDbValues(), this.getType()];
    }
}
