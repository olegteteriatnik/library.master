import { UserData } from './UserData';

export interface AuthApiService {
    /**
     * Generates user access token
     *
     * @param data {UserData} valid user data
     */
    generateUserToken(data: UserData): Promise<string>;
}
