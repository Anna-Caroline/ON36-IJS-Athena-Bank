import { AccountStatus } from '../enum/account-status.enum';
import { AccountType } from '../enum/account-type.enum';

export interface Account {
    id: string;
    holderDocument: string;
    type: AccountType;
    accountNumber: string;
    agency: string;

    balance: number;
    incomes: string[];
    outcomes: string[];

    status: AccountStatus;
    cards?: string[];

    creationDate: Date;
}
