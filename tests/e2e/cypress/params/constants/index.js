import dotenv from 'dotenv';

dotenv.config();

export default {
    baseUrl: process.env.BASE_URL,
    routes: {
        booksList: '/',
        login: '/login',
        books: {
            search: '/books/search',
            create: '/books/create',
            delete: '/books/delete',
        },
    },
    timeouts: {
        pageRender: 60_000,
        elementRender: 10_000,
        booklistLoad: 5_000,
        bookCreation: {
            timeout: 5_000,
            interval: 200,
        },
    },
};
