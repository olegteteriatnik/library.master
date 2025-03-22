import { describe, it, before, after } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import LibraryService from '../../src/services/LibraryService/LibraryService';
import Database from '../../config/database';

let sandbox: sinon.SinonSandbox;

describe('LibraryService', () => {
    before(() => {
        sandbox = sinon.createSandbox();
    });

    after(() => {
        sandbox.restore();
    });

    it('should add a book', async () => {
        const requestPayload = {
            title: 'Test Book',
            author: 'Author Name',
            year: 2025,
            isAvailable: true,
        };

        const expectedResponse = { id: 1, ...requestPayload };

        const dbRow = {
            rows: [expectedResponse],
        };

        const poolStub = { query: sinon.stub().resolves(dbRow) };
        sandbox.stub(Database, 'getInstance').resolves(poolStub as any);
        const response = await LibraryService.add(requestPayload);

        expect(response).to.deep.equal(expectedResponse);
    });
});
