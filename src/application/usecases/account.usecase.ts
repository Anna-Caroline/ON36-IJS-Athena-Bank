import { BusinessAccountServices } from './../../domain/services/business-account.services';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CheckingAccountServices } from '../../domain/services/checking-account.services';
import { SavingAccountServices } from '../../domain/services/saving-account.services';
import { CustomerServices } from '../../domain/services/customer.services';
import { CreateAccountDto } from '../dto/create-account.dto';
import { CreateOperationDto } from '../dto/create-operation.dto';
import { AccountType } from '../../domain/enum/account-type.enum';
import { BusinessDocumentValidator } from '../services/business-document-validator';

@Injectable()
export class AccountUseCases {
    constructor(
        private readonly checkingAccountService: CheckingAccountServices,
        private readonly savingAccountService: SavingAccountServices,
        private BusinessAccountServices: BusinessAccountServices,
        private businessValidator: BusinessDocumentValidator,
        private readonly customerServices: CustomerServices,
    ) {}

    /**
     * Creates a new account and associates it with a customer.
     * @param createAccountDto - DTO containing account creation data.
     * @returns Created account.
     */
    async createAccount(createAccountDto: CreateAccountDto) {
        try {
            let account;
            switch (createAccountDto.accountType) {
                case AccountType.Checking:
                    account = await this.checkingAccountService.create(createAccountDto);
                    break;
                case AccountType.Savings:
                    account = await this.savingAccountService.create(createAccountDto);
                    break;
                case AccountType.Business:
                    const address = await this.businessValidator.getCompanyInfo(createAccountDto.businessDocument)
                    account = await this.BusinessAccountServices.create(createAccountDto, address);
                    break;
                default:
                    throw new BadRequestException('Invalid account type');
            }
            await this.customerServices.addAccount(createAccountDto.holderDocument, account.accountNumber);
            return account;
        } catch (error) {
            throw new BadRequestException('Error creating account: ' + error.message);
        }
    }

    /**
     * Retrieves an account by its number and type.
     * @param accountNumber - The account number.
     * @param accountType - The type of account.
     * @returns The requested account.
     */
    async getAccount(accountNumber: string, accountType: AccountType) {
        try {
            return accountType === AccountType.Checking
                ? await this.checkingAccountService.getAccount(accountNumber)
                : await this.savingAccountService.getAccount(accountNumber);
        } catch (error) {
            throw new NotFoundException('Account not found: ' + error.message);
        }
    }

    /**
     * Deletes an account by its number and type.
     * @param accountNumber - The account number.
     * @param accountType - The type of account.
     */
    async deleteAccount(accountNumber: string, accountType: AccountType) {
        try {
            accountType === AccountType.Checking
                ? await this.checkingAccountService.delete(accountNumber)
                : await this.savingAccountService.delete(accountNumber);
        } catch (error) {
            throw new NotFoundException('Error deleting account: ' + error.message);
        }
    }

    /**
     * Deposits money into an account.
     * @param transaction - DTO containing transaction data.
     * @param accountReceiverType - The type of account receiving the deposit.
     */
    async deposit(transaction: CreateOperationDto, accountReceiverType: AccountType) {
        try {
            return accountReceiverType === AccountType.Checking
                ? await this.checkingAccountService.deposit(transaction)
                : await this.savingAccountService.deposit(transaction);
        } catch (error) {
            throw new BadRequestException('Error depositing funds: ' + error.message);
        }
    }

    /**
     * Withdraws money from an account.
     * @param transaction - DTO containing transaction data.
     * @param accountReceiverType - The type of account from which to withdraw.
     */
    async withdraw(transaction: CreateOperationDto, accountReceiverType: AccountType) {
        try {
            return accountReceiverType === AccountType.Checking
                ? await this.checkingAccountService.withdraw(transaction)
                : await this.savingAccountService.withdraw(transaction);
        } catch (error) {
            throw new BadRequestException('Error withdrawing funds: ' + error.message);
        }
    }

    /**
     * Transfers money between accounts.
     * @param transaction - DTO containing transaction data.
     * @param sourceAccountType - The type of source account.
     */
    async transfer(transaction: CreateOperationDto, sourceAccountType: AccountType) {
        try {
            return sourceAccountType === AccountType.Checking
                ? await this.checkingAccountService.transfer(transaction)
                : await this.savingAccountService.transfer(transaction);
        } catch (error) {
            throw new BadRequestException('Error transferring funds: ' + error.message);
        }
    }

    /**
     * Retrieves the statement for an account.
     * @param accountNumber - The account number.
     * @param accountType - The type of account.
     * @returns The account statement.
     */
    async statement(accountNumber: string, accountType: AccountType) {
        try {
            return accountType === AccountType.Checking
                ? await this.checkingAccountService.statement(accountNumber)
                : await this.savingAccountService.statement(accountNumber);
        } catch (error) {
            throw new NotFoundException('Error retrieving account statement: ' + error.message);
        }
    }
}
