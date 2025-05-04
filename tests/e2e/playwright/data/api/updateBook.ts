import { CreateBookPayload } from '../../api/services/booksApi/interfaces/CreateBookPayload';
import commonHelper from '../../helpers/commonHelper';

const createBookPayload: CreateBookPayload = {
    title: `API. Update Book Title ${new Date(Date.now()).toISOString()}`,
    author: `API. Update Book Author ${new Date(Date.now()).toISOString()}`,
    year: new Date().getFullYear(),
};

const updatedBookFields = {
    title: `API. Updated result Book Title ${new Date(Date.now()).toISOString()}`,
    author: `API. Updated result Book Author ${new Date(Date.now()).toISOString()}`,
    year: commonHelper.getRandomYear(),
};

function generateUpdateBookPayloadAndExpectedResult(id: number) {
    return {
        id,
        isAvailable: false,
        ...updatedBookFields,
    };
}

export default {
    createBookPayload,
    generateUpdateBookPayloadAndExpectedResult,
};
