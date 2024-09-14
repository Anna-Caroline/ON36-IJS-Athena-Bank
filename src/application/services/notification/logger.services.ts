import { Injectable } from '@nestjs/common';
import { Observer } from './interfaces/observer.interface';
import { EventType } from '../../enum/event-type.enum';
import { green, yellow, red } from 'colorette';

@Injectable()
export class Logger implements Observer {
    message(type: EventType, message: string): void {
        const timestamp = this.getTimestamp();
        const color = this.getColorByType(type);

        console.log(color(`[${timestamp}] `) + message);
    }

    private getColorByType(type: EventType) {
        switch (type) {
            case 'alert':
                return yellow;
            case 'error':
                return red;
            default:
                return green;
        }
    }

    private getTimestamp(): string {
        const now = new Date();
        return now.toISOString();
    }
}
