import { BooksSortBy } from './BooksSortBy';

export interface BooksListPayload {
    page?: number;
    pageSize?: number;
    sortBy?: BooksSortBy;
}
