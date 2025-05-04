import { AuthApiService } from '../services/authApi/AuthApiService';
import { BooksApiService } from '../services/booksApi/BooksApiService';

export interface LibraryMasterApi {
    authApi: AuthApiService;
    booksApi: BooksApiService;
}
