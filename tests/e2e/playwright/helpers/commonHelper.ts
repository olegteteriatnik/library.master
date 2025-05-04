import jwt from 'jsonwebtoken';
import { getSecret } from '../configs/vault';
import vaultConfig from '../configs/vault/config';
import { UserData } from '../params/interfaces/UserData';
import { DecodedToken } from '../params/interfaces/DecodedToken';
import texts from '../texts';

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

    public getRandomYear(): number {
        const minYear = 1000;
        const maxYear = new Date().getFullYear() - 1;

        return Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;
    }

    public booleanToYesNo(value: boolean): string {
        return value ? texts.bookDetails.availabilityValues.yes : texts.bookDetails.availabilityValues.no;
    }
}

export default new CommonHelper();
