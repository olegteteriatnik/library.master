import { Builder, WebDriver } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import firefox from 'selenium-webdriver/firefox';

class WebDriverHelper {
    public async buildDriver(): Promise<WebDriver> {
        const browser = process.env.BROWSER || 'chrome';

        if (browser === 'chrome') {
            const options = new chrome.Options();
            options.addArguments('--window-size=1920,1080');
            return new Builder().forBrowser('chrome').setChromeOptions(options).build();
        }

        if (browser === 'firefox') {
            const options = new firefox.Options();
            options.addArguments('--width=1920', '--height=1080');
            return new Builder().forBrowser('firefox').setFirefoxOptions(options).build();
        }

        throw new Error(`Unsupported browser: ${browser}`);
    }
}

export default new WebDriverHelper();
