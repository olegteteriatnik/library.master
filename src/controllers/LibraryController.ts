import { Request, Response, RequestHandler } from 'express';
import LibraryService from '../services/LibraryService/LibraryService';

export const add: RequestHandler = async (req: Request, res: Response) => {
    const { title, author, year, isAvailable } = req.body;

    if (!title || !author || !year) {
        res.status(400).json({ message: 'Title, author, and year are required' });
        return;
    }

    try {
        const newBook = await LibraryService.add({ title, author, year, isAvailable });
        res.status(200).json(newBook);
    } catch (error: any) {
        console.error('Error adding book: ', error.message);
        res.status(500).json({ message: 'Failed to add book' });
    }
};
