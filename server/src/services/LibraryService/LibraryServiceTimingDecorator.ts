import { LibraryService as LibraryServiceInterface } from '../../interfaces/LibraryService';
import { BookEntity } from '../../interfaces/BookEntity';
import { CreateBookParams } from '../../interfaces/CreateBookParams';
import { UpdateBookParams } from '../../interfaces/UpdateBookParams';
import { DeleteBookParams } from '../../interfaces/DeleteBookParams';
import { ListBooksParams } from '../../interfaces/ListBooksParams';
import { ListBooksResponse } from '../../interfaces/ListBooksResponse';
import { SearchBooksParams } from '../../interfaces/SearchBooksParams';
import { CheckAvailabilityResponse } from '../../interfaces/CheckAvailabilityResponse';
import logger from '../../app/logger';

export default class LibraryServiceTimingDecorator {
    constructor(private readonly decorated: LibraryServiceInterface) {}

    private async measure<T>(methodName: string, fn: () => Promise<T>): Promise<T> {
        const start = Date.now();

        try {
            return await fn();
        } finally {
            const end = Date.now();
            const duration = end - start;

            logger.info(`[Response time] /books/${methodName}`, {
                method: methodName,
                durationMs: duration,
                timestamp: new Date().toISOString(),
            });
        }
    }

    public add(data: CreateBookParams): Promise<BookEntity> {
        return this.measure('add', () => this.decorated.add(data));
    }

    public getById(id: number): Promise<BookEntity> {
        return this.measure('getById', () => this.decorated.getById(id));
    }

    public update(data: UpdateBookParams): Promise<BookEntity> {
        return this.measure('update', () => this.decorated.update(data));
    }

    public remove(data: DeleteBookParams): Promise<void> {
        return this.measure('remove', () => this.decorated.remove(data));
    }

    public list(data: ListBooksParams): Promise<ListBooksResponse> {
        return this.measure('list', () => this.decorated.list(data));
    }

    public search(data: SearchBooksParams): Promise<ListBooksResponse> {
        return this.measure('search', () => this.decorated.search(data));
    }

    public checkAvailability(id: number): Promise<CheckAvailabilityResponse> {
        return this.measure('checkAvailability', () => this.decorated.checkAvailability(id));
    }
}
