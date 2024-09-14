import { Injectable } from '@nestjs/common';
import { Observer } from './notification/interfaces/observer.interface';
import { EventType } from '../enum/event-type.enum';

@Injectable()
export class NotificationService {
    public observers: Observer[] = [];

    addObserver(observer: Observer): void {
        this.observers.push(observer);
    }

    removeObserver(observer: Observer): void {
        this.observers = this.observers.filter((obs) => obs !== observer);
    }

    notify(eventType: EventType, message: string): void {
        this.observers.forEach((observer) => observer.message(eventType, message));
    }
}
