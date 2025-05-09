import staticParams from '../../params/constants';

export class AddBookModal {
    modal = '[data-testid="add-book-modal"]';

    titleInput = '[data-testid="add-book-title-input"]';

    authorInput = '[data-testid="add-book-author-input"]';

    yearInput = '[data-testid="add-book-year-input"]';

    addButton = '[data-testid="add-book-submit-button"]';

    getModal(options = {}) {
        return cy.get(this.modal, options);
    }

    getTitleInput() {
        return this.getModal().find(this.titleInput);
    }

    getAuthorInput() {
        return this.getModal().find(this.authorInput);
    }

    getYearInput() {
        return this.getModal().find(this.yearInput);
    }

    getAddButton() {
        return this.getModal().find(this.addButton);
    }

    waitUntilIsOpened() {
        this.getModal({ timeout: staticParams.timeouts.elementRender })
            .should('be.visible')
            .and('not.be.disabled');
    }

    assertIsHiddenAfterWait() {
        this.getModal({ timeout: staticParams.timeouts.elementRender }).should('not.be.visible');
    }

    fillForm(data) {
        this.getTitleInput().type(data.title);
        this.getAuthorInput().type(data.author);
        this.getYearInput().type(data.year);
    }

    clickAddButton() {
        this.getAddButton().click();
    }
}
