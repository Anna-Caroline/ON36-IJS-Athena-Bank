import { AccountType } from '../enum/account-type.enum';
import { CommonAccount } from './common-account.model';

export class CheckingAccount extends CommonAccount {
    overdraftLimit: number = 1000;
    maintenanceFee: number = 0.03;
    cards: string[] = Array<string>();

    constructor(customerId: string, accountType: AccountType, accountNumber: string, agency: string) {
        super(customerId, accountType, accountNumber, agency);
    }
}
