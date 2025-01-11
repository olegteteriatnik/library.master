import Database from '../../../config/database';
import { CreateBookParams } from '../../interfaces/CreateBookParams';
import { BookEntity } from '../../interfaces/BookEntity';

export default class LibraryService {
    public static async add(data: CreateBookParams): Promise<BookEntity> {
        const { title, author, year, isAvailable } = data;
        const pool = await Database.getInstance();
        const query = `
            INSERT INTO books (title, author, year, "isAvailable")
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        const values = [title, author, year, isAvailable ?? true];

        const result = await pool.query(query, values);
        return result.rows[0];
    }
}
