import { injectable } from 'inversify';
import jwt from 'jsonwebtoken';

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

    public verifyToken(token: string): any {
        if (!this.secretKey) {
            throw new Error('SECRET_KEY not initialized');
        }
        try {
            return jwt.verify(token, this.secretKey);
        } catch (error) {
            throw new Error('Invalid or expired token');
        }
    }
}
