import { CreateBookPayload } from '../../api/services/booksApi/interfaces/CreateBookPayload';

const createBookPayload: CreateBookPayload = {
    title: `API. Delete Book Title ${new Date(Date.now()).toISOString()}`,
    author: `API. Delete Book Author ${new Date(Date.now()).toISOString()}`,
    year: new Date().getFullYear(),
};

export default {
    createBookPayload,
};
