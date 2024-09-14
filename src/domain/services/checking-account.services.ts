import { Injectable } from '@nestjs/common';
import { AccountServices } from './account.services';
import { CheckingAccount } from '../models/checking-account.model';
import { AccountType } from '../enum/account-type.enum';
import { Account } from '../interfaces/account.interface';
import { CreateAccountDto } from '../../application/dto/create-account.dto';
import { AccountRepository } from '../../infrastructure/repository/account.repository';

@Injectable()
export class CheckingAccountServices extends AccountServices {
    create({ holderDocument, accountType }: CreateAccountDto): Account {
        const num = this.bankServices.accountNumberGenerator();
        const agency = this.bankServices.agency;

        const account = new CheckingAccount(holderDocument, accountType, num, agency);
        this.accounts.push(account);

        AccountRepository.write(this.accounts);

        return account;
    }

    public getAccount(accountNumber: string): { index: number; account: Account } {
        const index = this.accounts.findIndex(
            (account: CheckingAccount) => account.accountNumber === accountNumber && account.type === AccountType.Checking,
        );

        if (index !== -1) {
            const account = this.accounts[index];
            return { index, account };
        }

        throw new Error(`Account with number ${accountNumber} not found.`);
    }

    public addCard(accountNumber: string, cardId: string) {
        const { account } = this.getAccount(accountNumber);
        account['cards'].push(cardId);

        this.update(accountNumber, { cards: account['cards'] });
    }
}
