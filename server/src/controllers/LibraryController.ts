import { Request, Response } from 'express';
import container from '../container/applicationContainer';
import Types from '../../params/constants/types';
import { LibraryService as LibraryServiceInterface } from '../interfaces/LibraryService';
import { CreateBookParams } from '../interfaces/CreateBookParams';
import { DeleteBookParams } from '../interfaces/DeleteBookParams';
import { ListBooksParams } from '../interfaces/ListBooksParams';
import { SearchBooksParams } from '../interfaces/SearchBooksParams';
import { handleError } from '../utils/handleError';

const libraryService = container.get<LibraryServiceInterface>(Types.LibraryServiceInterface);

export default class LibraryController {
    public async create(req: Request, res: Response): Promise<void> {
        try {
            const { title, author, year, isAvailable, type } = req.body as CreateBookParams;
            const newBook = await libraryService.add({ title, author, year, isAvailable, type });
            res.status(200).json(newBook);
        } catch (error) {
            const { status, message } = handleError(error, 'Failed to create book');
            res.status(status).json({ message });
        }
    }

    public async read(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.query;

            const book = await libraryService.getById(Number(id));
            res.status(200).json(book);
        } catch (error) {
            const { status, message } = handleError(error, 'Failed to read book');
            res.status(status).json({ message });
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        try {
            const { id, title, author, year, isAvailable, type } = req.body;

            const updatedBook = await libraryService.update({
                id: Number(id),
                title,
                author,
                year,
                isAvailable,
                type,
            });

            res.status(200).json(updatedBook);
        } catch (error) {
            const { status, message } = handleError(error, 'Failed to update book');
            res.status(status).json({ message });
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.body as DeleteBookParams;
            const removedBook = await libraryService.remove({ id });
            res.status(200).json(removedBook);
        } catch (error) {
            const { status, message } = handleError(error, 'Failed to delete book');
            res.status(status).json({ message });
        }
    }

    public async list(req: Request, res: Response): Promise<void> {
        try {
            const { page, pageSize, sortBy } = req.query as unknown as ListBooksParams;
            const booksList = await libraryService.list({ page, pageSize, sortBy });
            res.status(200).json(booksList);
        } catch (error) {
            const { status, message } = handleError(error, 'Failed to get list of books');
            res.status(status).json({ message });
        }
    }

    public async search(req: Request, res: Response): Promise<void> {
        try {
            const { page, pageSize, title, author, year, isAvailable } = req.query as unknown as SearchBooksParams;
            const foundBooks = await libraryService.search({ page, pageSize, title, author, year, isAvailable });
            res.status(200).json(foundBooks);
        } catch (error) {
            const { status, message } = handleError(error, 'Failed to search book');
            res.status(status).json({ message });
        }
    }

    public async checkAvailability(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.query;
            const availabilityResult = await libraryService.checkAvailability(Number(id));
            res.status(200).json(availabilityResult);
        } catch (error) {
            const { status, message } = handleError(error, 'Failed to check book availability');
            res.status(status).json({ message });
        }
    }
}
