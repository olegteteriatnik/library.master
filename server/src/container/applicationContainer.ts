import { Container } from 'inversify';
import { Database } from '../../config/database';
import LibraryService from '../services/LibraryService/LibraryService';
import AuthService from '../services/AuthService/AuthService';
import Types from '../../params/constants/types';

const container = new Container();

container.bind<Database>(Types.Database).to(Database).inSingletonScope();
container.bind<LibraryService>(Types.LibraryService).to(LibraryService).inSingletonScope();
container.bind<AuthService>(Types.AuthService).to(AuthService).inSingletonScope();

export default container;
