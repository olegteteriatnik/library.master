import { CreateBookPayload } from '../../api/services/booksApi/interfaces/CreateBookPayload';

const createBookPayload: CreateBookPayload = {
    title: `API. Check Book availability Title ${new Date(Date.now()).toISOString()}`,
    author: `API. Check Book availability Author ${new Date(Date.now()).toISOString()}`,
    year: new Date().getFullYear(),
    isAvailable: true,
};

export default {
    createBookPayload,
};
