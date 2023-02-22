import { IEvent } from './IEvent';
import { IUser } from './IUser';

export interface IEventWithAuthor extends IEvent {
    author: IUser;
}
