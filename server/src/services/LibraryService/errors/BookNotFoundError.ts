export class BookNotFoundError extends Error {
    public statusCode: number;

    constructor(message = 'Book not found') {
        super(message);
        this.name = 'BookNotFoundError';
        this.statusCode = 404;
    }
}
