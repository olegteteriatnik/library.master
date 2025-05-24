import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from '../helpers/chai';
import { expectErrorFrom } from '../helpers/expectError';
import * as Vault from '../../../server/config/vault';
import AuthService from '../../../server/src/services/AuthService/AuthService';

let sandbox: sinon.SinonSandbox;
let authService: AuthService;
const secretKey = 'secretKey';

describe('AuthService', () => {
    beforeEach(() => {
        sandbox = sinon.createSandbox();
        sandbox.stub(Vault, 'getSecret').resolves({ key: secretKey });

        authService = new AuthService();
        authService.setSecretKey(secretKey);
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should generate a valid JWT token', async () => {
        const requestPayload = {
            username: 'testUsername',
            password: 'testPassword',
        };

        const token = authService.generateToken(requestPayload);
        const decoded = jwt.verify(token, secretKey);

        expect(decoded).to.include(requestPayload);
    });

    it('should verify a valid token', async () => {
        const requestPayload = {
            username: 'testUsername',
            password: 'testPassword',
        };

        const token = jwt.sign(requestPayload, secretKey, { expiresIn: '1h' });
        const verified = authService.verifyToken(token);

        expect(verified).to.include(requestPayload);
    });

    it('should throw an error for an invalid token', async () => {
        const invalidToken = 'invalidToken';

        await expectErrorFrom(
            () => Promise.resolve(authService.verifyToken(invalidToken)),
            { message: 'Invalid or expired token' },
        );
    });
});
