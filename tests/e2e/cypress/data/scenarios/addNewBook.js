const bookData = {
    title: `Add Book Title ${new Date(Date.now()).toISOString()}`,
    author: `Add Book Author ${new Date(Date.now()).toISOString()}`,
    year: new Date().getFullYear(),
};

function generateExpectedBookData(id) {
    return {
        id,
        title: bookData.title,
        author: bookData.author,
        year: bookData.year,
        isAvailable: true,
    };
}

export default {
    bookData,
    generateExpectedBookData,
};
