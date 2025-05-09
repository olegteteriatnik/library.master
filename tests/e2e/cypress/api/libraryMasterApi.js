import { AuthApiService } from './services/authApi/AuthApiService';
import { BooksApiService } from './services/booksApi/BooksApiService';

export class LibraryMasterApi {
    authApi = new AuthApiService();
    booksApi = new BooksApiService();
}
