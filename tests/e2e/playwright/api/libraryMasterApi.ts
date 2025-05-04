import { LibraryMasterApi as LibraryMasterApiInterface } from './interfaces/LibraryMasterApi';
import { AuthApiService } from './services/authApi/AuthApiService';
import { BooksApiService } from './services/booksApi/BooksApiService';

export class LibraryMasterApi implements LibraryMasterApiInterface {
    public readonly authApi = new AuthApiService();

    public readonly booksApi = new BooksApiService();
}
