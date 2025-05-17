import staticParams from '../../params/constants';
import { AddBookPayload } from '../interfaces/AddBookPayload.ts';

export default class AddBookModal {
    private readonly modal = $('[data-testid="add-book-modal"]');

    private readonly titleInput = this.modal.$('[data-testid="add-book-title-input"]');

    private readonly authorInput = this.modal.$('[data-testid="add-book-author-input"]');

    private readonly yearInput = this.modal.$('[data-testid="add-book-year-input"]');

    private readonly addButton = this.modal.$('[data-testid="add-book-submit-button"]');

    public async waitUntilIsOpened(): Promise<void> {
        await this.modal.waitForDisplayed({ timeout: staticParams.timeouts.elementRender });
        await this.modal.waitForEnabled({ timeout: staticParams.timeouts.elementRender });
    }

    public async fillForm(data: AddBookPayload): Promise<void> {
        await this.titleInput.setValue(data.title);
        await this.authorInput.setValue(data.author);
        await this.yearInput.setValue(data.year);
    }

    public async clickAddButton(): Promise<void> {
        await this.addButton.click();
    }

    public async isHiddenAfterWait(): Promise<boolean> {
        return await this.modal.waitForDisplayed({ timeout: staticParams.timeouts.elementRender, reverse: true });
    }
}