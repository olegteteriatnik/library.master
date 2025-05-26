import { HandleErrorResult } from '../../params/interfaces/HandleErrorResult';
import { BookNotFoundError, InvalidBookError, DuplicateBookError } from '../services/LibraryService/errors';

export function handleError(error: unknown, defaultMessage = 'Internal Server Error'): HandleErrorResult {
    if (error instanceof BookNotFoundError) {
        return { status: error.statusCode, message: error.message };
    }

    if (error instanceof DuplicateBookError) {
        return { status: error.statusCode, message: error.message };
    }

    if (error instanceof InvalidBookError) {
        return { status: error.statusCode, message: error.message };
    }

    if (error instanceof Error) {
        return { status: 500, message: error.message };
    }

    return { status: 500, message: defaultMessage };
}
