import { Response, NextFunction } from 'express';
import container from '../container/applicationContainer';
import Types from '../../params/constants/types';
import AuthService from '../services/AuthService/AuthService';
import { AuthenticatedRequest } from './interfaces/AuthenticatedRequest';
import { handleError } from '../utils/handleError';

const authService = container.get<AuthService>(Types.AuthService);

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Token is required.' });
        return;
    }

    try {
        req.user = authService.verifyToken(token);
        next();
    } catch (error) {
        const { status, message } = handleError(error, 'Failed to authenticate.');
        res.status(status).json({ message });
    }
};
