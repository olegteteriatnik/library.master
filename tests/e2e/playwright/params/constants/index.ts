export default {
    baseUrl: 'http://203.161.47.9:3100',
    routes: {
        login: '/login',
        book: (id: number) => `/book?id=${id}`,
        books: {
            search: '/books/search',
            delete: '/books/delete',
            create: '/books/create',
            read: '/books/get',
            list: '/books/list',
            update: '/books/update',
            checkAvailability: '/books/checkAvailability',
        },
    },
    timeouts: {
        pageRender: 60_000,
        elementRender: 10_000,
        tokenLoad: 5_000,
        booklistLoad: 5_000,
        bookCreation: {
            timeout: 5_000,
            interval: 200,
        },
    },
};
