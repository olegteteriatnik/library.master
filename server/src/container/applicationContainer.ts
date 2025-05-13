import { Container } from 'inversify';
import { Database } from '../../config/database';
import LibraryService from '../services/LibraryService/LibraryService';
import AuthService from '../services/AuthService/AuthService';
import EventManagerService from '../services/EventManagerService/EventManagerService';
import EventManagerServiceProxy from '../services/EventManagerService/EventManagerServiceProxy';
import { EventManagerService as EventManagerServiceInterface } from '../services/EventManagerService/interfaces/EventManagerService';
import { LoggerObserver } from '../services/EventManagerService/LoggerObserver';
import Types from '../../params/constants/types';

const container = new Container();

container.bind<Database>(Types.Database).to(Database).inSingletonScope();
container.bind<LibraryService>(Types.LibraryService).to(LibraryService).inSingletonScope();
container.bind<AuthService>(Types.AuthService).to(AuthService).inSingletonScope();
container.bind<EventManagerServiceInterface>(Types.EventManagerServiceInterface).to(EventManagerService).inSingletonScope();
container.bind<EventManagerServiceInterface>(Types.EventManagerService).to(EventManagerServiceProxy).inSingletonScope();
container.bind<LoggerObserver>(LoggerObserver).toSelf().inSingletonScope();

export default container;
