import { defineConfig } from '@playwright/test';
import { getExecutionContext } from './environment/getExecutionContext';

const context = getExecutionContext();

export default defineConfig({
    workers: 1,
    testDir: '../specs',
    use: {
        headless: context.isHeadless(),
        viewport: null,
        launchOptions: {
            args: ['--start-maximized'],
        },
        screenshot: 'only-on-failure',
    },
    reporter: context.getReporters(),
});
