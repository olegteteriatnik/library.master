import { BrowserContextOptions, defineConfig, devices } from '@playwright/test';
import { getExecutionContext } from './environment/getExecutionContext';

const context = getExecutionContext();

function getBaseUse(projectName: string): Partial<ReturnType<typeof defineConfig>['use']> {
    return {
        headless: context.isHeadless(),
        viewport: projectName === 'chromium' ? null : { width: 1920, height: 1080 },
        screenshot: 'only-on-failure',
    };
}

function cleanDevice(device: BrowserContextOptions) {
    const clone = { ...device };
    delete (clone as Partial<BrowserContextOptions>).deviceScaleFactor;
    return clone;
}

export default defineConfig({
    workers: 1,
    testDir: '../specs',
    reporter: context.getReporters(),
    projects: [
        {
            name: 'chromium',
            use: {
                ...cleanDevice(devices['Desktop Chrome']),
                ...getBaseUse('chromium'),
                launchOptions: { args: ['--start-maximized'] },
            },
        },
        {
            name: 'firefox',
            use: {
                ...cleanDevice(devices['Desktop Firefox']),
                ...getBaseUse('firefox'),
            },
        },
    ],
});
