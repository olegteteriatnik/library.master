import { BooksApiService } from '../services/booksApi/BooksApiService';
import { AuthApiService } from '../services/authApi/AuthApiService';

export interface LibraryMasterApi {
    booksApi: BooksApiService;

    authApi: AuthApiService;
}
