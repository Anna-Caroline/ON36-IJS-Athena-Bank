import { AccountRepository } from '../../infrastructure/repository/account.repository';
import { Transaction } from '../models/transaction.model';
import { OperationValidator } from '../utils/operation-validator';
import { AccountOperations } from '../interfaces/account-operations.interface';
import { Account } from '../interfaces/account.interface';
import { TransactionServices } from './transaction.services';
import { CreateAccountDto } from '../../application/dto/create-account.dto';
import { BankingServices } from './banking.services';
import { AccountStatus } from '../enum/account-status.enum';
import { TransactionRepository } from '../../infrastructure/repository/transaction.repository';
import { AccountOperationDetails } from '../models/valueObjects/account-operation-details';
import { CreateOperationDto } from '../../application/dto/create-operation.dto';
import { TransactionType } from '../enum/transaction-type.enum';
import { Address } from '../models/valueObjects/user-address';

export abstract class AccountServices implements AccountOperations {
    protected accounts: Account[];
    protected bankServices: BankingServices;

    private validator: OperationValidator = new OperationValidator();

    constructor() {
        this.bankServices = new BankingServices();
        this.accounts = AccountRepository.read();
    }

    abstract create({ holderDocument, accountType }: CreateAccountDto, address?: Address): Account;

    abstract getAccount(accountNumber: string): { index: number; account: Account };

    protected update(accountNumber: string, updates: Partial<Account>): void {
        const index = this.accounts.findIndex((account: Account) => account.accountNumber == accountNumber);

        this.accounts[index] = { ...this.accounts[index], ...updates };
        AccountRepository.write(this.accounts);
    }

    public delete(accountNumber: string): void {
        this.update(accountNumber, { status: AccountStatus.deleted });
    }

    public deposit(transaction: CreateOperationDto): void {
        const { account, index } = this.getAccount(transaction.receiverAccount);

        const newTransaction = new Transaction(
            transaction.amount,
            TransactionType.deposit,
            transaction.description,
            new AccountOperationDetails(null, null, transaction.receiver, transaction.receiverAccount),
        );

        if (account && this.validator.validate(newTransaction, account)) {
            const service = new TransactionServices(newTransaction);
            service.record();

            account.balance += newTransaction.amount;
            account.incomes.push(newTransaction.id);
            this.accounts[index] = account;
            AccountRepository.write(this.accounts);
        }
    }

    public withdraw(transaction: CreateOperationDto): void {
        const { account, index } = this.getAccount(transaction.debtorAccount);

        const newTransaction = new Transaction(
            transaction.amount,
            TransactionType.withdraw,
            transaction.description,
            new AccountOperationDetails(transaction.debtor, transaction.debtorAccount, null, null),
        );

        if (account && this.validator.validate(newTransaction, account)) {
            const service = new TransactionServices(newTransaction);
            service.record();

            account.balance -= newTransaction.amount;
            account.outcomes.push(newTransaction.id);

            this.accounts[index] = account;
            AccountRepository.write(this.accounts);
        }
    }

    public transfer(transaction: CreateOperationDto): void {
        const { account: debtorAccount, index: debtorIndex } = this.getAccount(transaction.debtorAccount);
        const { account: receiverAccount, index: receiverIndex } = this.getAccount(transaction.receiverAccount);

        const newTransaction = new Transaction(
            transaction.amount,
            TransactionType.transfer,
            transaction.description,
            new AccountOperationDetails(transaction.debtor, transaction.debtorAccount, transaction.receiver, transaction.receiverAccount),
        );

        if (debtorAccount && receiverAccount && this.validator.validate(newTransaction as Transaction, debtorAccount)) {
            const service = new TransactionServices(newTransaction);

            service.record();

            debtorAccount.balance -= newTransaction.amount;
            debtorAccount.outcomes.push(newTransaction.id);

            receiverAccount.balance += newTransaction.amount;
            receiverAccount.incomes.push(newTransaction.id);

            this.accounts[debtorIndex] = debtorAccount;
            this.accounts[receiverIndex] = receiverAccount;

            AccountRepository.write(this.accounts);
        }
    }

    public statement(accountNumber: string) {
        const { account } = this.getAccount(accountNumber);
        if (account) {
            const transactions = TransactionRepository.read();

            const transaction = transactions.filter((transaction: Transaction) => transaction.source.receiverAccount === accountNumber);

            return transaction;
        }
        return [];
    }
}
