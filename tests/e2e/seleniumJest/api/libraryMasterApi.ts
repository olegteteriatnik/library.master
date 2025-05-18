import { LibraryMasterApi as LibraryMasterApiInterface } from './interfaces/LibraryMasterApi';
import { BooksApiService } from './services/booksApi/BooksApiService';
import { AuthApiService } from './services/authApi/AuthApiService';

export class LibraryMasterApi implements LibraryMasterApiInterface {
    public readonly booksApi = new BooksApiService();

    public readonly authApi = new AuthApiService();
}
