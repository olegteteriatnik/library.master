import axios from 'axios';
import { AuthApiService as AuthApiServiceInterface } from './interfaces/AuthApiService';
import staticParams from '../../../params/constants';
import { UserData } from './interfaces/UserData';

const { baseUrl, routes } = staticParams;

export class AuthApiService implements AuthApiServiceInterface {
    public async generateUserToken(data: UserData): Promise<string> {
        const response =  await axios.post(
            `${baseUrl}${routes.login}`,
            data,
            { headers: { 'Content-Type': 'application/json' } },
        );

        return response.data.token;
    }
}
