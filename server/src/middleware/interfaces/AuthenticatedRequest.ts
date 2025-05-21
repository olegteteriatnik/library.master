import { Request } from 'express';
import { Token } from '../../../params/interfaces/Token';

export interface AuthenticatedRequest extends Request {
    user?: Token;
}
