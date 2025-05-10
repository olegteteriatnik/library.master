import { Request, Response } from 'express';
import container from '../container/applicationContainer';
import Types from '../../params/constants/types';
import AuthService from '../services/AuthService/AuthService';
import { getSecret } from '../../config/vault';

const authService = container.get<AuthService>(Types.AuthService);

export const login = async (req: Request, res: Response): Promise<void> => {
    const authUser = await getSecret('authUser');
    const { username, password } = req.body;

    if (username === authUser.username && password === authUser.password) {
        const token = authService.generateToken({ username });
        res.status(200).json({ token });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
}
