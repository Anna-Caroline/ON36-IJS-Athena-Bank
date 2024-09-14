import { AccountType } from '../enum/account-type.enum';
import { CommonAccount } from './common-account.model';

export class SavingAccount extends CommonAccount {
    interestRate: number = 0.01;

    constructor(customerId: string, accountType: AccountType, accountNumber: string, agency: string) {
        super(customerId, accountType, accountNumber, agency);
    }
}
