import { CreateAccountDto } from '../dto/create-account.dto';
import { CreateOperationDto } from '../dto/create-operation.dto';
import { AccountType } from '../../domain/enum/account-type.enum';

export interface IAccountUseCases {
    createAccount(createAccountDto: CreateAccountDto): Promise<any>;
    getAccount(accountNumber: string, accountType: AccountType): Promise<any>;

    deleteAccount(accountNumber: string, accountType: AccountType): Promise<void>;
    deposit(transaction: CreateOperationDto, accountReceiverType: AccountType): Promise<void>;
    withdraw(transaction: CreateOperationDto, accountReceiverType: AccountType): Promise<void>;
    transfer(transaction: CreateOperationDto, sourceAccountType: AccountType): Promise<void>;
    statement(accountNumber: string, accountType: AccountType): Promise<any>;
}
