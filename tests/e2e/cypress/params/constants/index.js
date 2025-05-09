export default {
    baseUrl: 'http://203.161.47.9:3100',
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
