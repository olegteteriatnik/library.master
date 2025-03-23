import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from '../helpers/chai';
import { expectErrorFrom } from '../helpers/expectError';
import * as Vault from '../../../config/vault';
import AuthService, { initializeSecretKey } from '../../../src/services/AuthService/AuthService';

let sandbox: sinon.SinonSandbox;
const secretKey = 'secretKey';

describe('AuthService', () => {
    beforeEach(() => {
        sandbox = sinon.createSandbox();
        sandbox.stub(Vault, 'getSecret').resolves({ key: secretKey });
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should generate a valid JWT token', async () => {
        await initializeSecretKey();

        const requestPayload = {
            username: 'testUsername',
            password: 'testPassword',
        };

        const token = AuthService.generateToken(requestPayload);
        const decoded = jwt.verify(token, secretKey);

        expect(decoded).to.include(requestPayload);
    });

    it('should verify a valid token', async () => {
        await initializeSecretKey();

        const requestPayload = {
            username: 'testUsername',
            password: 'testPassword',
        };

        const token = jwt.sign(requestPayload, secretKey, { expiresIn: '1h' });
        const verified = AuthService.verifyToken(token);

        expect(verified).to.include(requestPayload);
    });

    it('should throw an error for an invalid token', async () => {
        await initializeSecretKey();
        const invalidToken = 'invalidToken';

        await expectErrorFrom(
            () => AuthService.verifyToken(invalidToken),
            { message: 'Invalid or expired token' },
        );
    });
});
