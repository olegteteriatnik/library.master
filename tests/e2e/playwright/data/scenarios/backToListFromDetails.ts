import { CreateBookPayload } from '../../api/services/booksApi/interfaces/CreateBookPayload';

const createBookPayload: CreateBookPayload = {
    title: `Edit Book on details page Title ${new Date(Date.now()).toISOString()}`,
    author: `Edit Book on details page Author ${new Date(Date.now()).toISOString()}`,
    year: new Date().getFullYear(),
};

export default {
    createBookPayload,
};
