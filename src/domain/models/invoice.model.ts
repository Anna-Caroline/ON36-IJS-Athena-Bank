import { randomUUID } from 'crypto';
import { Transaction } from './transaction.model';
import { InvoiceStatus } from '../enum/invoice-status.enum';

export class Invoice {
    id: string;
    status: InvoiceStatus;
    issueDate: Date;
    settlementDate: Date;
    totalDue: number;
    totalPaid: number;
    installments: Transaction[];

    constructor(settlementDate: Date) {
        this.id = randomUUID().toString();
        this.status = InvoiceStatus.PENDING;
        this.settlementDate = settlementDate;
        this.totalDue = 0;
        this.totalPaid = 0;
        this.installments = new Array<Transaction>();
    }
}
