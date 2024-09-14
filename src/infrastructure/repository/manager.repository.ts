import * as fs from 'fs';
import * as path from 'path';
import { Manager } from '../../domain/models/manager.model';

export class ManagerRepository {
    protected static filePath = path.join(__dirname, '..', 'repository', 'data', 'managers.json');

    protected static ensureFileExists(): void {
        if (!fs.existsSync(this.filePath)) {
            fs.mkdirSync(path.dirname(this.filePath), { recursive: true });
            fs.writeFileSync(this.filePath, '[]', 'utf8');
        }
    }

    static read(): Manager[] {
        this.ensureFileExists();
        const data = fs.readFileSync(this.filePath, 'utf8');
        return JSON.parse(data).filter((manager: Manager) => manager.isActive === true);
    }

    static write(manager: Manager[]): void {
        this.ensureFileExists();
        fs.writeFileSync(this.filePath, JSON.stringify(manager, null, 2), 'utf8');
    }
}
