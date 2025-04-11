import { LibraryMasterApi as LibraryMasterApiInterface } from './interfaces/LibraryMasterApi';
import { AuthApiService } from './services/authApi/AuthApiService';

export class LibraryMasterApi implements LibraryMasterApiInterface {
    public readonly authApi = new AuthApiService();
}
