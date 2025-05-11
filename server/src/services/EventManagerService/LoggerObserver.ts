import { injectable } from 'inversify';
import { Observer } from './Observer';
import logger from '../../app/logger';

@injectable()
export class LoggerObserver implements Observer {
    update(eventType: string, payload: any): void {
        logger.info(`[${eventType}]`, { payload });
    }
}
