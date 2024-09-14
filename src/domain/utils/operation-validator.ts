import { Transaction } from '../models/transaction.model';
import { AccountStatus } from '../enum/account-status.enum';
import { Account } from '../interfaces/account.interface';
import { EventType } from '../../application/enum/event-type.enum';
import { AccountType } from '../enum/account-type.enum';
import { TransactionType } from '../enum/transaction-type.enum';

export class OperationValidator {
    validate(transaction: Transaction, account: Account): boolean {
        if (account.status === AccountStatus.open && transaction.amount < 10) {
            return false;
        } else if (account.status === AccountStatus.open) {
            account.status = AccountStatus.active;
        }

        if (transaction.type != TransactionType.deposit) return this.checkFunds(transaction.type, transaction.amount, account);
        return true;
    }

    private checkFunds(type: string, amount: number, account: Account): boolean {
        if (account.type == AccountType.Checking) {
            if (account.balance - amount <= -account['overdraftLimit'] && account.status === AccountStatus.active) {
                return false;
            }
            if (type == TransactionType.transfer || type == TransactionType.withdraw || type == TransactionType.payment) {
                if (account.balance - amount < 0) {
                    return true;
                }
            }
        } else {
            if (account.balance - amount < 0 && account.status === AccountStatus.active) {
                return false;
            }
        }
        return true;
    }
}
