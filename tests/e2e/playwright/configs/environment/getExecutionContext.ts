import { CIExecutionContext } from './CIExecutionContext';
import { LocalExecutionContext } from './LocalExecutionContext';
import { ExecutionContext as ExecutionContextInterface } from './interfaces/ExecutionContext';

export function getExecutionContext(): ExecutionContextInterface {
    return process.env.CI ? new CIExecutionContext() : new LocalExecutionContext();
}
