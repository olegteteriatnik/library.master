export class InvalidBookError extends Error {
    public statusCode: number;

    constructor(message = 'Invalid book data') {
        super(message);
        this.name = 'InvalidBookError';
        this.statusCode = 400;
    }
}
