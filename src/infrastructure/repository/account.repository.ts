import * as fs from 'fs';
import * as path from 'path';
import { Account } from '../../domain/interfaces/account.interface';

export class AccountRepository {
    protected static filePath = path.join(__dirname, '..', 'repository', 'data', 'accounts.json');

    protected static ensureFileExists(): void {
        if (!fs.existsSync(this.filePath)) {
            fs.mkdirSync(path.dirname(this.filePath), { recursive: true });
            fs.writeFileSync(this.filePath, '[]', 'utf8');
        }
    }

    static read(): Account[] {
        this.ensureFileExists();
        const data = fs.readFileSync(this.filePath, 'utf8');
        return JSON.parse(data);
    }

    static write(accounts: Account[]): void {
        this.ensureFileExists();
        fs.writeFileSync(this.filePath, JSON.stringify(accounts, null, 2), 'utf8');
    }
}
