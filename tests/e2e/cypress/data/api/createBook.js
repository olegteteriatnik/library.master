const createBookPayload = {
    title: `API. Create Book Title ${new Date(Date.now()).toISOString()}`,
    author: `API. Create Book Author ${new Date(Date.now()).toISOString()}`,
    year: new Date().getFullYear(),
};

export default {
    createBookPayload,
};
