import { Injectable } from '@nestjs/common';
import { AccountServices } from './account.services';
import { AccountType } from '../enum/account-type.enum';
import { Account } from '../interfaces/account.interface';
import { CreateAccountDto } from '../../application/dto/create-account.dto';
import { AccountRepository } from '../../infrastructure/repository/account.repository';
import { BusinessAccount } from '../models/business-account.model';

@Injectable()
export class BusinessAccountServices extends AccountServices {
    create({ holderDocument, accountType, businessDocument, businessAddress, industry }: CreateAccountDto, adress): Account {
        const num = this.bankServices.accountNumberGenerator();
        const agency = this.bankServices.agency;

        const account = new BusinessAccount(holderDocument, accountType, businessDocument, businessAddress, industry, adress, num, agency);
        this.accounts.push(account);
        console.log(account);

        AccountRepository.write(this.accounts);

        return account;
    }

    public getAccount(accountNumber: string): { index: number; account: Account } {
        const index = this.accounts.findIndex(
            (account: BusinessAccount) => account.accountNumber === accountNumber && account.type === AccountType.Business,
        );

        if (index !== -1) {
            const account = this.accounts[index];
            return { index, account };
        }

        throw new Error(`Account with number ${accountNumber} not found.`);
    }

    addPartner(accountNumber: string, partnerId: string): void {
        const { index, account } = this.getAccount(accountNumber);
        const bussinessAccount = account as BusinessAccount;

        bussinessAccount.owners.push(partnerId);

        this.accounts[index] = bussinessAccount;
        AccountRepository.write(this.accounts);
    }

    removePartner(accountNumber: string, partnerId: string): void {
        const { index, account } = this.getAccount(accountNumber);
        const bussinessAccount = account as BusinessAccount;

        bussinessAccount.owners.filter((partner) => partner !== partnerId);

        this.accounts[index] = bussinessAccount;
        AccountRepository.write(this.accounts);
    }
}
