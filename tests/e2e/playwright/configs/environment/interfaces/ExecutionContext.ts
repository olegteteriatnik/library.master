import type { ReporterDescription } from '@playwright/test';

export interface ExecutionContext {
    isCI(): boolean;
    isHeadless(): boolean;
    getReporters(): ReporterDescription[];
}
