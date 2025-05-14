import { Container } from 'inversify';
import { Database } from '../../config/database';
import LibraryService from '../services/LibraryService/LibraryService';
import { LibraryService as LibraryServiceInterface } from '../interfaces/LibraryService';
import LibraryServiceTimingDecorator from '../services/LibraryService/LibraryServiceTimingDecorator';
import AuthService from '../services/AuthService/AuthService';
import EventManagerService from '../services/EventManagerService/EventManagerService';
import EventManagerServiceProxy from '../services/EventManagerService/EventManagerServiceProxy';
import { EventManagerService as EventManagerServiceInterface } from '../services/EventManagerService/interfaces/EventManagerService';
import { LoggerObserver } from '../services/EventManagerService/LoggerObserver';
import Types from '../../params/constants/types';

const container = new Container();

container.bind<Database>(Types.Database).to(Database).inSingletonScope();
container.bind<AuthService>(Types.AuthService).to(AuthService).inSingletonScope();
container.bind<EventManagerServiceInterface>(Types.EventManagerServiceInterface).to(EventManagerService).inSingletonScope();
container.bind<EventManagerServiceInterface>(Types.EventManagerService).to(EventManagerServiceProxy).inSingletonScope();
container.bind<LoggerObserver>(LoggerObserver).toSelf().inSingletonScope();
container.bind<LibraryService>(Types.LibraryService).to(LibraryService).inSingletonScope();
container.bind<LibraryServiceInterface>(Types.LibraryServiceInterface).toDynamicValue((context) => {
    const db = context.get<Database>(Types.Database);
    const events = context.get<EventManagerService>(Types.EventManagerService);
    const original = new LibraryService(db, events);
    return new LibraryServiceTimingDecorator(original);
}).inSingletonScope();

export default container;
