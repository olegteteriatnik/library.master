import Database from '../../../config/database';
import { CreateBookParams } from '../../interfaces/CreateBookParams';
import { BookEntity } from '../../interfaces/BookEntity';
import { RemoveBookParams } from '../../interfaces/RemoveBookParams';
import { ListBooksParams } from '../../interfaces/ListBooksParams';
import { ListBooksResponse } from '../../interfaces/ListBooksResponse';
import { SearchBooksParams } from '../../interfaces/SearchBooksParams';
import { CheckAvailabilityResponse } from '../../interfaces/CheckAvailabilityResponse';

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

    public static async remove(data: RemoveBookParams): Promise<void> {
        const pool = await Database.getInstance();
        const query = `
            DELETE FROM books
            WHERE id = $1;
        `
        const values = [data.id];

        try {
            const result = await pool.query(query, values);

            if (result.rowCount === 0) {
                new Error(`Book with id ${data.id} not found`);
            }

            return result.rows[0];
        } catch (error: any) {
            console.error(`Failed to delete book with id ${data.id}:`, error.message);
            throw error;
        }
    }

    public static async list(data: ListBooksParams): Promise<ListBooksResponse> {
        const pool = await Database.getInstance();
        const page = data.page ?? 1;
        const pageSize = data.pageSize ?? 10;

        const countQuery = `
            SELECT COUNT(*) AS total FROM books;
        `;
        const countResult = await pool.query(countQuery);
        const total = parseInt(countResult.rows[0].total, 10);

        let query = `
            SELECT * FROM books
        `;

        if (data.sortBy) {
            const validSortFields = ['title', 'author', 'year'];
            if (validSortFields.includes(data.sortBy)) {
                query += ` ORDER BY ${data.sortBy}`;
            } else {
                throw new Error(`${data.sortBy} is invalid sort field`);
            }
        }

        const offset = (page - 1) * pageSize;
        query += ` LIMIT $1 OFFSET $2`;
        const booksResult = await pool.query(query, [pageSize, offset]);

        return {
            total,
            currentPage: page,
            items: booksResult.rows as BookEntity[],
        };
    }

    public static async search(data: SearchBooksParams): Promise<ListBooksResponse> {
        const pool = await Database.getInstance();
        const page = data.page ?? 1;
        const pageSize = data.pageSize ?? 10;

        let query = `
            SELECT * FROM books
        `;
        let countQuery = `
            SELECT COUNT(*) AS total FROM books
        `;

        const values = [];
        const conditions: string[] = [];

        if (data.title) {
            conditions.push(`title ILIKE $${values.length + 1}`);
            values.push(`%${data.title}%`);
        }
        if (data.author) {
            conditions.push(`author ILIKE $${values.length + 1}`);
            values.push(`%${data.author}%`);
        }
        if (data.year) {
            conditions.push(`year = $${values.length + 1}`);
            values.push(data.year);
        }
        if (data.isAvailable) {
            conditions.push(`"isAvailable" = $${values.length + 1}`);
            values.push(data.isAvailable);
        }

        if (conditions.length > 0) {
            const whereClause = ` WHERE ${conditions.join(' AND ')}`;
            query += whereClause;
            countQuery += whereClause;
        }

        const countResult = await pool.query(countQuery, values);
        const total = parseInt(countResult.rows[0].total, 10);

        const offset = (page - 1) * pageSize;
        query += ` ORDER BY title LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
        values.push(pageSize, offset);

        const booksResult = await pool.query(query, values);

        return {
            total,
            currentPage: page,
            items: booksResult.rows as BookEntity[],
        }
    }

    public static async checkAvailability(id: number): Promise<CheckAvailabilityResponse> {
        const pool = await Database.getInstance();

        const query = `
            SELECT "isAvailable" FROM books WHERE id = $1;
        `;

        const result = await pool.query(query, [id]);

        if (result.rows.length === 0) {
            throw new Error(`Book with id ${id} not found.`);
        }

        return {
            id,
            isAvailable: result.rows[0].isAvailable,
        }
    }
}
