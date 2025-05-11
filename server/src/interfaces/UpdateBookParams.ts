import { BookType } from './BookType';

export interface UpdateBookParams {
    id: number;
    title?: string;
    author?: string;
    year?: number;
    isAvailable?: boolean;
    type?: BookType;
}
