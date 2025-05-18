import { WebDriver, WebElement, By, until } from 'selenium-webdriver';
import { AddBookPayload } from '../interfaces/AddBookPayload';
import staticParams from '../../params/constants';

export default class AddBookModal {
    constructor(private driver: WebDriver) {}

    private modal = By.css('[data-testid="add-book-modal"]');

    private titleInput = By.css('[data-testid="add-book-title-input"]');

    private authorInput = By.css('[data-testid="add-book-author-input"]');

    private yearInput = By.css('[data-testid="add-book-year-input"]');

    private addButton = By.css('[data-testid="add-book-submit-button"]');

    private async getModal(): Promise<WebElement> {
        return this.driver.findElement(this.modal);
    }

    private async getTitleInput(): Promise<WebElement> {
        return (await this.getModal()).findElement(this.titleInput);
    }

    private async getAuthorInput(): Promise<WebElement> {
        return (await this.getModal()).findElement(this.authorInput);
    }

    private async getYearInput(): Promise<WebElement> {
        return (await this.getModal()).findElement(this.yearInput);
    }

    private async getAddButton(): Promise<WebElement> {
        return (await this.getModal()).findElement(this.addButton);
    }

    public async waitUntilIsOpened(): Promise<void> {
        await this.driver.wait(until.elementLocated(this.modal), staticParams.timeouts.elementRender);
        const modal = await this.getModal();
        await this.driver.wait(until.elementIsVisible(modal), staticParams.timeouts.elementRender);
        await this.driver.wait(until.elementIsEnabled(modal), staticParams.timeouts.elementRender);
    }

    public async fillForm(data: AddBookPayload): Promise<void> {
        await (await this.getTitleInput()).sendKeys(data.title);
        await (await this.getAuthorInput()).sendKeys(data.author);
        await (await this.getYearInput()).sendKeys(data.year);
    }

    public async clickAddButton(): Promise<void> {
        await (await this.getAddButton()).click();
    }

    public async isHiddenAfterWait(): Promise<boolean> {
        try {
            await this.driver.wait(async () => {
                const modal = await this.getModal();
                return !(await modal.isDisplayed());
            }, staticParams.timeouts.elementRender);

            return true;
        } catch {
            return false;
        }
    }
}
