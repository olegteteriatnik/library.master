import { Request, Response } from 'express';
import LibraryService from '../services/LibraryService/LibraryService';
import { CreateBookParams } from '../interfaces/CreateBookParams';

export default class LibraryController {
    public async add(req: Request, res: Response): Promise<void> {
        try {
            const { title, author, year, isAvailable } = req.body as CreateBookParams;
            const newBook = await LibraryService.add({ title, author, year, isAvailable });
            res.status(200).json(newBook);
        } catch (error: any) {
            console.error('Error adding book: ', error.message);
            res.status(500).json({ message: 'Failed to add book' });
        }
    }
}
