import { TransactionRepository } from '../../infrastructure/repository/transaction.repository';
import { Transaction } from '../models/transaction.model';
import { TransactionStatus } from '../enum/transaction-status.enum';

export class TransactionServices {
    private transactions: Transaction[];
    private transaction: Transaction;

    constructor(transaction: Transaction) {
        this.transaction = transaction;
        this.transactions = TransactionRepository.read();
    }

    record() {
        this.transaction.dueDate = new Date();
        this.transaction.status = TransactionStatus.confirmed;

        this.transactions.push(this.transaction);
        TransactionRepository.write(this.transactions);
    }

    report() {
        this.transaction.status = TransactionStatus.failed;

        this.transactions.push(this.transaction);
        TransactionRepository.write(this.transactions);
    }
}
