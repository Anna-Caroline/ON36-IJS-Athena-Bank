import * as fs from 'fs';
import * as path from 'path';
import { CreditCard } from '../../domain/models/credit-card.model';

export class CardRepository {
    protected static filePath = path.join(__dirname, '..', 'repository', 'data', 'card.json');

    protected static ensureFileExists(): void {
        if (!fs.existsSync(this.filePath)) {
            fs.mkdirSync(path.dirname(this.filePath), { recursive: true });
            fs.writeFileSync(this.filePath, '[]', 'utf8');
        }
    }

    static read() {
        this.ensureFileExists();
        const data = fs.readFileSync(this.filePath, 'utf8');
        return JSON.parse(data);
    }

    static write(cards: CreditCard[]): void {
        this.ensureFileExists();
        fs.writeFileSync(this.filePath, JSON.stringify(cards, null, 2), 'utf8');
    }
}
