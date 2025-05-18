import axios from 'axios';
import staticParams from '../../../params/constants';
import { BooksApiService as BooksApiServiceInterface } from './interfaces/BooksApiService';
import { BookEntity } from './interfaces/BookEntity';
import { CreateBookPayload } from './interfaces/CreateBookPayload';
import { SearchPayload } from './interfaces/SearchPayload';
import { BooksList } from './interfaces/BooksList';

const { baseUrl, routes } = staticParams;

export class BooksApiService implements BooksApiServiceInterface {
    public async create(userAccessToken: string, data: CreateBookPayload): Promise<BookEntity> {
        const response = await axios.post(
            `${baseUrl}${routes.books.create}`,
            data,
            { headers: { Authorization: `Bearer ${userAccessToken}` } },
        );

        return response.data;
    }

    public async delete(userAccessToken: string, id: number): Promise<boolean> {
        await axios.delete(
            `${baseUrl}${routes.books.delete}`,
            {
                headers: { Authorization: `Bearer ${userAccessToken}`},
                data: { id },
            },
        );

        return true;
    }

    public async search(userAccessToken: string, data: SearchPayload): Promise<BooksList> {
        const response = await axios.get(
            `${baseUrl}${routes.books.search}`,
            {
                params: data,
                headers: { Authorization: `Bearer ${userAccessToken}` },
            },
        );

        return response.data;
    }
}
