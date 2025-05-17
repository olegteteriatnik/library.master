import { getSecret } from '../configs/vault';
import vaultConfig from '../configs/vault/config';
import { UserData } from '../params/interfaces/UserData';

class CommonHelper {
    public async getUserData(): Promise<UserData> {
        return await getSecret(vaultConfig.authUser);
    }
}

export default new CommonHelper();
