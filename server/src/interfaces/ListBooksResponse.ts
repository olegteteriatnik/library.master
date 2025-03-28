import { BookEntity } from './BookEntity';

export interface ListBooksResponse {
    total: number;
    currentPage: number;
    items: BookEntity[];
}
