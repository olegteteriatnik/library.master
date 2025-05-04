import { SearchPayload } from './SearchPayload';
import { BooksList } from './BooksList';
import { CreateBookPayload } from './CreateBookPayload';
import { BookEntity } from './BookEntity';
import { UpdateBookPayload } from './UpdateBookPayload';
import { BooksListPayload } from './BooksListPayload';
import { CheckAvailabilityResponse } from './CheckAvailabilityResponse';

export interface BooksApiService {
    /**
     * Gets a book list depending on search parameters
     *
     * @param userAccessToken {string} access token to authorize to library master
     * @param data {SearchPayload} search payload
     */
    search(userAccessToken: string, data: SearchPayload): Promise<BooksList>;

    /**
     * Deletes a book
     *
     * @param userAccessToken {string} access token to authorize to library master
     * @param id {string} id of a book
     */
    delete(userAccessToken: string, id: number): Promise<boolean>;

    /**
     * Creates a book
     *
     * @param userAccessToken {string} access token to authorize to library master
     * @param data {CreateBookPayload} create book payload
     */
    create(userAccessToken: string, data: CreateBookPayload): Promise<BookEntity>;

    /**
     * Gets a book
     *
     * @param userAccessToken {string} access token to authorize to library master
     * @param id {number} book id
     */
    get(userAccessToken: string, id: number): Promise<BookEntity | null>;

    /**
     * updates a book
     *
     * @param userAccessToken {string} access token to authorize to library master
     * @param data {UpdateBookPayload} update book payload
     */
    update(userAccessToken: string, data: UpdateBookPayload): Promise<BookEntity>;

    /**
     * Gets books list
     *
     * @param userAccessToken {string} access token to authorize to library master
     * @param data {BooksListPayload} get book list payload
     */
    list(userAccessToken: string, data: BooksListPayload): Promise<BooksList>;

    /**
     * Gets a book availability
     *
     * @param userAccessToken {string} access token to authorize to library master
     * @param id {number} book id
     */
    checkAvailability(userAccessToken: string, id: number): Promise<CheckAvailabilityResponse>;
}
