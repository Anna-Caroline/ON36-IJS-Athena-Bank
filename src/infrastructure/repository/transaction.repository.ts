import { Transaction } from '../../domain/models/transaction.model';
import * as fs from 'fs';
import * as path from 'path';

export class TransactionRepository {
    protected static filePath = path.join(__dirname, '..', 'repository', 'data', 'transaction.json');

    protected static ensureFileExists(): void {
        if (!fs.existsSync(this.filePath)) {
            fs.mkdirSync(path.dirname(this.filePath), { recursive: true });
            fs.writeFileSync(this.filePath, '[]', 'utf8');
        }
    }

    static read(): Transaction[] {
        this.ensureFileExists();
        const data = fs.readFileSync(this.filePath, 'utf8');
        return JSON.parse(data);
    }

    static write(transaction: Transaction[]): void {
        this.ensureFileExists();
        fs.writeFileSync(this.filePath, JSON.stringify(transaction, null, 2), 'utf8');
    }
}
