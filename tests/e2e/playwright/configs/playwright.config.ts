import { defineConfig, ReporterDescription } from '@playwright/test';

const isCI = !!process.env.CI;

const testomatioReporter: ReporterDescription = [
    '@testomatio/reporter/lib/adapter/playwright.js',
    { apiKey: process.env.TESTOMATIO }
];

export default defineConfig({
    testDir: '../specs',
    use: {
        headless: isCI,
        viewport: null,
        launchOptions: {
            args: ['--start-maximized'],
        },
    },
    reporter: [
        ['list'],
        ...(isCI ? [testomatioReporter] : [])
    ],
});
