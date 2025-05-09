class FrameworkHelper {
    addBookOnListPage(bookData) {
        cy.addBookOnListPage(bookData);
    }

    deleteCreatedBook() {
        cy.deleteCreatedBook();
    }

    getUserData() {
        return cy.task('getSecret', 'authUser');
    }
}

export default new FrameworkHelper();
