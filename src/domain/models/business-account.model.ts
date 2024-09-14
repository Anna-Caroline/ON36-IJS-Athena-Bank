import { AccountStatus } from '../enum/account-status.enum';
import { AccountType } from '../enum/account-type.enum';
import { CheckingAccount } from './checking-account.model';
import { Address } from './valueObjects/user-address';

export class BusinessAccount extends CheckingAccount {
    id: string;
    businessDocument: string;
    businessAddress: Address;
    industry: string;
    owners: string[] = new Array<string>();

    constructor(
        holderDocument: string,
        accountType: AccountType,
        businessDocument: string,
        businessAddress: Address,
        industry: string,
        adress: Address,
        accountNumber: string,
        agency: string,
    ) {
        super(holderDocument, accountType, accountNumber, agency);
        this.businessDocument = businessDocument;
        this.businessAddress = businessAddress;
        this.industry = industry;
        console.log(holderDocument);
        this.businessAddress = adress;
        this.owners.push(holderDocument);
    }
}
