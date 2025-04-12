import jwt from 'jsonwebtoken';
import { getSecret } from '../configs/vault';
import vaultConfig from '../configs/vault/config';
import { UserData } from '../params/interfaces/UserData';
import { DecodedToken } from '../params/interfaces/DecodedToken';

class CommonHelper {
    public async getUserData(): Promise<UserData> {
        return await getSecret(vaultConfig.authUser);
    }

    public isTokenValid(token: string): boolean {
        const decodedToken = jwt.decode(token);

        if (!decodedToken || typeof (decodedToken as DecodedToken).exp !== 'number') {
            return false;
        }

        const expirationDate = (decodedToken as DecodedToken).exp;
        const currentTimeInSeconds = Date.now() / 1000;

        return expirationDate > currentTimeInSeconds;
    }
}

export default new CommonHelper();
