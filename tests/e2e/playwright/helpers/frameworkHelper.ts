import { Locator, Page } from '@playwright/test';
import staticParams from '../params/constants';

class FrameworkHelper {
    public async waitUntilElementVisible(locator: Locator, timeout = staticParams.timeouts.elementRender): Promise<void> {
        await locator.waitFor({ state: 'visible', timeout });
    }

    public async waitUntilElementEnabled(locator: Locator, timeout = staticParams.timeouts.elementRender): Promise<void> {
        const isEnabled = await locator.isEnabled({ timeout });
        if (!isEnabled) {
            throw new Error(`Element not enabled. Selector: ${locator.toString()}`);
        }
    }

    public async isElementDisplayedAfterWait(locator: Locator, timeout = staticParams.timeouts.elementRender): Promise<boolean> {
        try {
            await this.waitUntilElementVisible(locator, timeout);
            return true;
        } catch {
            return false;
        }
    }

    public async getTokenFromLocalStorage(page: Page): Promise<string> {
        await page.waitForFunction((key) => !!localStorage.getItem(key), 'token', { timeout: staticParams.timeouts.tokenLoad });
        const token = await page.evaluate((key) => localStorage.getItem(key), 'token');

        if (!token) {
            throw new Error('Token not found in localStorage');
        }

        return token;
    }
}

export default new FrameworkHelper();
