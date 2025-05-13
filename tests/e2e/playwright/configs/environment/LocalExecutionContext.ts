import type { ReporterDescription } from '@playwright/test';
import { ExecutionContext as ExecutionContextInterface } from './interfaces/ExecutionContext';

export class LocalExecutionContext implements ExecutionContextInterface {
    isCI(): boolean {
        return false;
    }

    isHeadless(): boolean {
        return false;
    }

    getReporters(): ReporterDescription[] {
        return [['list']];
    }
}
