import { Locator } from '@playwright/test';
import staticParams from '../params/constants';

class FrameworkHelper {
    public async waitUntilVisible(locator: Locator, timeout = staticParams.timeouts.elementRender): Promise<void> {
        await locator.waitFor({ state: 'visible', timeout });
    }

    public async waitUntilEnabled(locator: Locator, timeout = staticParams.timeouts.elementRender): Promise<void> {
        const isEnabled = await locator.isEnabled();
        if (!isEnabled) {
            throw new Error(`Element not enabled. Selector: ${locator.toString()}`);
        }
    }
}

export default new FrameworkHelper();
