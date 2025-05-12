import { CreateBookPayload } from '../api/services/booksApi/interfaces/CreateBookPayload';
import { Prototype } from './Prototype';

export class BookPrototype implements CreateBookPayload, Prototype<BookPrototype>{
    title: string;
    author: string;
    year: number;
    isAvailable?: boolean;

    constructor(data: Partial<CreateBookPayload>) {
        const timestamp = new Date(Date.now()).toISOString();
        this.title = `${data.title} ${timestamp}`;
        this.author = `${data.author} ${timestamp}`;
        this.year = data.year ?? new Date().getFullYear();
        this.isAvailable = data.isAvailable;
    }

    clone(): BookPrototype {
        return new BookPrototype({
            title: this.title,
            author: this.author,
            year: this.year,
            isAvailable: this.isAvailable,
        });
    }
}
