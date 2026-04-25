import container from '../../container/applicationContainer';
import Types from '../../../params/constants/types';
import AuthService from './AuthService';

export async function initializeSecretKey(): Promise<void> {
    const secret = process.env.SECRET_KEY;

    if (!secret) {
        throw new Error('SECRET_KEY is missing or invalid');
    }

    const authService = container.get<AuthService>(Types.AuthService);
    authService.setSecretKey(secret);
}
