import { BookEntity } from './BookEntity';
import { CreateBookParams } from './CreateBookParams';
import { UpdateBookParams } from './UpdateBookParams';
import { DeleteBookParams } from './DeleteBookParams';
import { ListBooksParams } from './ListBooksParams';
import { ListBooksResponse } from './ListBooksResponse';
import { SearchBooksParams } from './SearchBooksParams';
import { CheckAvailabilityResponse } from './CheckAvailabilityResponse';

export interface LibraryService {
    add(data: CreateBookParams): Promise<BookEntity>;
    getById(id: number): Promise<BookEntity>;
    update(data: UpdateBookParams): Promise<BookEntity>;
    remove(data: DeleteBookParams): Promise<void>;
    list(data: ListBooksParams): Promise<ListBooksResponse>;
    search(data: SearchBooksParams): Promise<ListBooksResponse>;
    checkAvailability(id: number): Promise<CheckAvailabilityResponse>;
}
