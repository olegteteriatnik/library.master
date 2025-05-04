import axios from 'axios';
import staticParams from '../../../params/constants';
import { BooksApiService as BooksApiServiceInterface } from './interfaces/BooksApiService';
import { SearchPayload } from './interfaces/SearchPayload';
import { BooksList } from './interfaces/BooksList';
import { BookEntity } from './interfaces/BookEntity';
import { CreateBookPayload } from './interfaces/CreateBookPayload';
import { UpdateBookPayload } from './interfaces/UpdateBookPayload';
import { BooksListPayload } from './interfaces/BooksListPayload';
import { CheckAvailabilityResponse } from './interfaces/CheckAvailabilityResponse';

const { baseUrl, routes } = staticParams;

export class BooksApiService implements BooksApiServiceInterface {
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

    public async create(userAccessToken: string, data: CreateBookPayload): Promise<BookEntity> {
        const response = await axios.post(
            `${baseUrl}${routes.books.create}`,
            data,
            { headers: { Authorization: `Bearer ${userAccessToken}` } },
        );

        return response.data;
    }

    public async get(userAccessToken: string, id: number): Promise<BookEntity | null> {
        try {
            const response = await axios.get(
                `${baseUrl}${routes.books.read}`,
                {
                    params: { id },
                    headers: { Authorization: `Bearer ${userAccessToken}` },
                },
            );

            return response.data;
        } catch (error: any) {
            if (error.response.status === 404) {
                return null;
            }
            throw error;
        }
    }

    public async update(userAccessToken: string, data: UpdateBookPayload): Promise<BookEntity> {
        const response = await axios.put(
            `${baseUrl}${routes.books.update}`,
            data,
            { headers: { Authorization: `Bearer ${userAccessToken}` } },
        );

        return response.data;
    }

    public async list(userAccessToken: string, data: BooksListPayload): Promise<BooksList> {
        const response = await axios.get(
            `${baseUrl}${routes.books.list}`,
            {
                params: data,
                headers: { Authorization: `Bearer ${userAccessToken}` },
            },
        );

        return response.data;
    }

    public async checkAvailability(userAccessToken: string, id: number): Promise<CheckAvailabilityResponse> {
        const response = await axios.get(
            `${baseUrl}${routes.books.checkAvailability}`,
            {
                params: { id },
                headers: { Authorization: `Bearer ${userAccessToken}` },
            },
        );

        return response.data;
    }
}
