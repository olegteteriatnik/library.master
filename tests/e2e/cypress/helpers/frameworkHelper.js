class FrameworkHelper {
    addBookOnListPage(bookData) {
        cy.addBookOnListPage(bookData);
    }

    deleteCreatedBook() {
        cy.deleteCreatedBook();
    }

    getUserData() {
        const username = Cypress.env("AUTH_USERNAME");
        const password = Cypress.env("AUTH_PASSWORD");

        return { username, password };
    }
}

export default new FrameworkHelper();
