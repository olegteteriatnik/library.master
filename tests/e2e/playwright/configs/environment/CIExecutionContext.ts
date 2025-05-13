import type { ReporterDescription } from '@playwright/test';
import { ExecutionContext as ExecutionContextInterface } from './interfaces/ExecutionContext';

const testomatioReporter: ReporterDescription = [
    '@testomatio/reporter/lib/adapter/playwright.js',
    { apiKey: process.env.TESTOMATIO }
];

export class CIExecutionContext implements ExecutionContextInterface {
    isCI(): boolean {
        return true;
    }

    isHeadless(): boolean {
        return true;
    }

    getReporters(): ReporterDescription[] {
        return [
            ['list'],
            testomatioReporter
        ];
    }
}
