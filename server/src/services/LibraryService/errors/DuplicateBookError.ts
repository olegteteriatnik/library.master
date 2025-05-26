export class DuplicateBookError extends Error {
    public statusCode: number;

    constructor(message = 'Book already exists') {
        super(message);
        this.name = 'DuplicateBookError';
        this.statusCode = 409;
    }
}
