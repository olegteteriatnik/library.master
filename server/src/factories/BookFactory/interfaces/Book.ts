import { BookType } from '../../../interfaces/BookType';

export interface Book {
    getTitle(): string;
    getAuthor(): string;
    getYear(): number;
    getAvailability(): boolean;
    getType(): BookType;
    toDbValues(): [string, string, number, boolean, string];
}
