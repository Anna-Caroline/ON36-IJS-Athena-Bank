import { AccountStatus } from '../enum/account-status.enum';
import { AccountType } from '../enum/account-type.enum';
import { Account } from '../interfaces/account.interface';
import { randomUUID } from 'crypto';

export abstract class CommonAccount implements Account {
    id: string;
    holderDocument: string;
    type: AccountType;
    accountNumber: string;
    agency: string;

    balance: number;
    incomes: string[];
    outcomes: string[];

    status: AccountStatus;

    creationDate: Date;
    accountType: AccountType;

    constructor(holderDocument: string, accountType: AccountType, accountNumber: string, agency: string) {
        this.id = randomUUID().toString();
        this.holderDocument = holderDocument;
        this.type = accountType;
        this.accountNumber = accountNumber;
        this.agency = agency;
        this.status = AccountStatus.open;
        this.balance = 0;
        this.incomes = [];
        this.outcomes = [];
        this.creationDate = new Date();
    }
}
