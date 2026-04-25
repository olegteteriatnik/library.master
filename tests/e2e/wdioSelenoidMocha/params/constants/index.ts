export default {
    baseUrl: process.env.BASE_URL,
    routes: {
        login: '/login',
        book: (id: number) => `/book?id=${id}`,
        books: {
            search: '/books/search',
            delete: '/books/delete',
            create: '/books/create',
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
