import * as fs from 'fs';
import * as path from 'path';
import { Customer } from '../../domain/models/customer.model';

export class CustomerRepository {
    protected static filePath = path.join(__dirname, '..', 'repository', 'data', 'customers.json');

    protected static ensureFileExists(): void {
        if (!fs.existsSync(this.filePath)) {
            fs.mkdirSync(path.dirname(this.filePath), { recursive: true });
            fs.writeFileSync(this.filePath, '[]', 'utf8');
        }
    }

    static read(): Customer[] {
        this.ensureFileExists();
        const data = fs.readFileSync(this.filePath, 'utf8');
        return JSON.parse(data).filter((customer: Customer) => customer.isActive === true);
    }

    static write(customer: Customer[]): void {
        this.ensureFileExists();
        fs.writeFileSync(this.filePath, JSON.stringify(customer, null, 2), 'utf8');
    }
}
