import { defineConfig, ReporterDescription } from '@playwright/test';

const isCI = !!process.env.CI;

const testomatioReporter: ReporterDescription = [
    '@testomatio/reporter/lib/adapter/playwright.js',
    { apiKey: process.env.TESTOMATIO }
];

export default defineConfig({
    workers: 1,
    testDir: '../specs',
    use: {
        headless: isCI,
        viewport: null,
        launchOptions: {
            args: ['--start-maximized'],
        },
        screenshot: 'only-on-failure',
    },
    reporter: [
        ['list'],
        ...(isCI ? [testomatioReporter] : [])
    ],
});
