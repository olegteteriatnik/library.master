import { Builder, WebDriver } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

class WebDriverHelper {
    public async buildChromeDriver(): Promise<WebDriver> {
        const options = new chrome.Options();
        options.addArguments('--window-size=1920,1080');
        return new Builder().forBrowser('chrome').setChromeOptions(options).build();
    }
}

export default new WebDriverHelper();
