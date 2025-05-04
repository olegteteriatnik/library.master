import { CreateBookPayload } from '../../api/services/booksApi/interfaces/CreateBookPayload';

const createBookPayload: CreateBookPayload = {
    title: `Search Book Title ${new Date(Date.now()).toISOString()}`,
    author: `Search Book Author ${new Date(Date.now()).toISOString()}`,
    year: new Date().getFullYear(),
};

export default {
    createBookPayload,
}
