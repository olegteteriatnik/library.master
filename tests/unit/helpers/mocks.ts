import sinon from 'sinon';
import type { Database } from '../../../server/config/database';
import type EventManagerService from '../../../server/src/services/EventManagerService/EventManagerService';

export function createDatabaseMock(transport = { query: sinon.stub() }) {
    return {
        connect: sinon.stub().resolves(transport),
    } as unknown as sinon.SinonStubbedInstance<Database>;
}

export function createEventManagerMock() {
    return {
        notify: sinon.stub(),
    } as unknown as sinon.SinonStubbedInstance<EventManagerService>;
}
