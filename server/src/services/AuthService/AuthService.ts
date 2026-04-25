import { injectable } from 'inversify';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Token } from '../../../params/interfaces/Token';

const TOKEN_EXPIRATION = '8h';

@injectable()
export default class AuthService {
    private secretKey: string | undefined;

    public setSecretKey(secret: string) {
        this.secretKey = secret;
    }

    public generateToken(payload: object): string {
        if (!this.secretKey) {
            throw new Error('SECRET_KEY not initialized');
        }

        return jwt.sign(payload, this.secretKey, { expiresIn: TOKEN_EXPIRATION });
    }

    public verifyToken(token: string): Token {
        if (!this.secretKey) {
            throw new Error('SECRET_KEY not initialized');
        }

        let decoded: string | JwtPayload;

        try {
            decoded = jwt.verify(token, this.secretKey);
        } catch {
            throw new Error('Invalid or expired token');
        }

        if (typeof decoded === 'string') {
            throw new Error('Invalid token payload');
        }

        return decoded as Token;
    }
}
