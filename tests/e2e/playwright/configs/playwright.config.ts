import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: '../specs',
    use: {
        headless: !!process.env.CI,
        viewport: null,
        launchOptions: {
            args: ['--start-maximized'],
        },
    },
});
