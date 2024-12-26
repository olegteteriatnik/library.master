import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './interfaces/AuthenticatedRequest';
import AuthService from '../services/AuthService/AuthService';

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Token is required.' });
        return;
    }

    try {
        req.user = AuthService.verifyToken(token);
        next();
    } catch (error: any) {
        res.status(401).json({ message: error.message });
    }
};
