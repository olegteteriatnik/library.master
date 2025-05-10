import container from '../../container/applicationContainer';
import Types from '../../../params/constants/types';
import AuthService from './AuthService';
import { getSecret } from '../../../config/vault';

export async function initializeSecretKey(): Promise<void> {
    const secret = (await getSecret('authKey')).key;

    if (!secret) {
        throw new Error('SECRET_KEY is missing or invalid');
    }

    const authService = container.get<AuthService>(Types.AuthService);
    authService.setSecretKey(secret);
}
