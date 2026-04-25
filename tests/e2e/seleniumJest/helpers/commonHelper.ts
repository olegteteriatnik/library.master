import { UserData } from '../params/interfaces/UserData';

class CommonHelper {
    public getUserData(): UserData {
        const username = process.env.AUTH_USERNAME;
        const password = process.env.AUTH_PASSWORD;

        if (!username || !password) {
            throw new Error("username/password is not present in .env file");
        }

        return { username, password };
    }
}

export default new CommonHelper();
