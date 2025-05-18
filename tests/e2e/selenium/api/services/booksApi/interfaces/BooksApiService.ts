import { BookEntity } from './BookEntity';
import { CreateBookPayload } from './CreateBookPayload';
import { SearchPayload } from './SearchPayload';
import { BooksList } from './BooksList';

export interface BooksApiService {
    /**
     * Creates a book
     *
     * @param userAccessToken {string} access token to authorize to library master
     * @param data {CreateBookPayload} create book payload
     */
    create(userAccessToken: string, data: CreateBookPayload): Promise<BookEntity>;

    /**
     * Deletes a book
     *
     * @param userAccessToken {string} access token to authorize to library master
     * @param id {string} id of a book
     */
    delete(userAccessToken: string, id: number): Promise<boolean>;
    /**
     * Gets a book list depending on search parameters
     *
     * @param userAccessToken {string} access token to authorize to library master
     * @param data {SearchPayload} search payload
     */
    search(userAccessToken: string, data: SearchPayload): Promise<BooksList>;
}
