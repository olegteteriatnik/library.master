import { Request, Response } from 'express';
import LibraryService from '../services/LibraryService/LibraryService';
import { CreateBookParams } from '../interfaces/CreateBookParams';
import { DeleteBookParams } from '../interfaces/DeleteBookParams';
import { ListBooksParams } from '../interfaces/ListBooksParams';
import { SearchBooksParams } from '../interfaces/SearchBooksParams';

export default class LibraryController {
    public async create(req: Request, res: Response): Promise<void> {
        try {
            const { title, author, year, isAvailable } = req.body as CreateBookParams;
            const newBook = await LibraryService.add({ title, author, year, isAvailable });
            res.status(200).json(newBook);
        } catch (error: any) {
            console.error('Error adding book: ', error.message);
            res.status(500).json({ message: 'Failed to add book' });
        }
    }

    public async read(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.query;

            const book = await LibraryService.getById(Number(id));
            res.status(200).json(book);
        } catch (error: any) {
            if (error.message.includes('not found')) {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ message: error.message });
            }
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        try {
            const { id, title, author, year, isAvailable } = req.body;

            const updatedBook = await LibraryService.update({
                id: Number(id),
                title,
                author,
                year,
                isAvailable,
            });

            res.status(200).json(updatedBook);
        } catch (error: any) {
            if (error.message.includes('not found')) {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ message: error.message });
            }
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.body as DeleteBookParams;
            const removedBook = await LibraryService.remove({ id });
            res.status(200).json(removedBook);
        } catch (error: any) {
            if (error.message.includes('not found')) {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ message: error.message });
            }
        }
    }

    public async list(req: Request, res: Response): Promise<void> {
        try {
            const { page, pageSize, sortBy } = req.query as unknown as ListBooksParams;
            const booksList = await LibraryService.list({ page, pageSize, sortBy });
            res.status(200).json(booksList);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public async search(req: Request, res: Response): Promise<void> {
        try {
            const { page, pageSize, title, author, year, isAvailable } = req.query as unknown as SearchBooksParams;
            const foundBooks = await LibraryService.search({ page, pageSize, title, author, year, isAvailable });
            res.status(200).json(foundBooks);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public async checkAvailability(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.query;
            const availabilityResult = await LibraryService.checkAvailability(Number(id));
            res.status(200).json(availabilityResult);
        } catch (error: any) {
            if (error.message.includes('not found')) {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ message: error.message });
            }
        }
    }
}
