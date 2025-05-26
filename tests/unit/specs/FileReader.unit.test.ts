import sinon from 'sinon';
import * as fs from 'fs';
import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from '../helpers/chai';
import { expectErrorFrom } from '../helpers/expectError';
import FileReader from '../../../server/src/services/FileReader/FileReader';

let sandbox: sinon.SinonSandbox;

describe('FileReader', () => {
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should read file content successfully', async () => {
        const path = './some/path/file.txt';
        const content = 'Hello, this is a test content.';
        sandbox.stub(fs.promises, 'readFile').resolves(content);
        const reader = new FileReader();
        const result = await reader.readFile(path);

        expect(result).to.equal(content);
        expect(fs.promises.readFile).to.have.been.calledWith(path, 'utf8');
    });

    it('should throw an error if reading the file fails', async () => {
        const path = './invalid/path/file.txt';
        const errorMessage = 'ENOENT: no such file or directory';
        const readError = new Error(errorMessage);
        sandbox.stub(fs.promises, 'readFile').rejects(readError);
        const reader = new FileReader();

        await expectErrorFrom(
            reader.readFile(path),
            { message: 'ENOENT' },
        );

        expect(fs.promises.readFile).to.have.been.calledWith(path, 'utf8');
    });
});