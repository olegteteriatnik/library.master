import { CreateBookPayload } from '../../api/services/booksApi/interfaces/CreateBookPayload';

const createBookPayload: CreateBookPayload = {
    title: `Delete Book on details page Title ${new Date(Date.now()).toISOString()}`,
    author: `Delete Book on details page Author ${new Date(Date.now()).toISOString()}`,
    year: new Date().getFullYear(),
};

export default {
    createBookPayload,
}
