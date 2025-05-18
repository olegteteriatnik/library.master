import { BookEntity } from './BookEntity';

export interface BooksList {
    total: number;
    currentPage: number;
    items: BookEntity[];
}
