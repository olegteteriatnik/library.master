import jwt from 'jsonwebtoken';
import { getSecret } from '../../../config/vault';

let SECRET_KEY: string;

export async function initializeSecretKey() {
    SECRET_KEY = (await getSecret('authKey')).key;

    if (!SECRET_KEY) {
        throw new Error('SECRET_KEY is missing or invalid');
    }
}

const TOKEN_EXPIRATION = '1h';

export default class AuthService {
    static generateToken(payload: object): string {
        return jwt.sign(payload, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION });
    }

    static verifyToken(token: string): any {
        try {
            return jwt.verify(token, SECRET_KEY);
        } catch (error) {
            throw new Error('Invalid or expired token');
        }
    }
}
