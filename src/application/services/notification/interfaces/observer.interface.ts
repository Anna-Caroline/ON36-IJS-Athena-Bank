import { EventType } from '../../../enum/event-type.enum';

export interface Observer {
    message(eventType: EventType, data: any): void;
}
