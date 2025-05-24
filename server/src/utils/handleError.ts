import { HandleErrorResult } from '../../params/interfaces/HandleErrorResult';

export function handleError(error: unknown, context?: string): HandleErrorResult {
    if (error instanceof Error) {
        const message = context ? `${context}: ${error.message}` : error.message;

        if (message.includes('not found')) {
            return { status: 404, message };
        }

        return { status: 500, message };
    }

    return {
        status: 500,
        message: context ? `${context}: Unknown error` : 'Unknown error'
    };
}
