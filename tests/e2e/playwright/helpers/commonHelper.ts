import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { UserData } from '../params/interfaces/UserData';
import { DecodedToken } from '../params/interfaces/DecodedToken';
import texts from '../texts';

dotenv.config();

class CommonHelper {
    public getUserData(): UserData {
        const username = process.env.AUTH_USERNAME;
        const password = process.env.AUTH_PASSWORD;

        if (!username || !password) {
            throw new Error("username/password is not present in .env file");
        }

        return { username, password };
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

    public enumToRegex(enumObject: Record<string, string>): RegExp {
        const values = Object.values(enumObject).join('|');
        return new RegExp(`^(${values})$`);
    }
}

export default new CommonHelper();
