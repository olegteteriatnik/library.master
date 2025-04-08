import { defineConfig } from '@playwright/test';

const isCI = !!process.env.CI;

export default defineConfig({
    testDir: '../specs',
    use: {
        headless: isCI,
        viewport: null,
        launchOptions: {
            args: ['--start-maximized'],
        },
    },
    reporter: [['list']],
});
