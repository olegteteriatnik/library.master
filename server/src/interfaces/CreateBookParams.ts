import { BookType } from './BookType';

export interface CreateBookParams {
    title: string;
    author?: string;
    year: number;
    isAvailable?: boolean;
    type?: BookType;
}
