import { BookType } from './BookType';

export interface BookEntity {
    id: number;
    title: string;
    author: string;
    year: number;
    isAvailable: boolean;
    type: BookType;
}
