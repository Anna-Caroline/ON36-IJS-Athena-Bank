import { Manager } from '../models/manager.model';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../application/dto/create-user.dto';
import { ManagerRepository } from '../../infrastructure/repository/manager.repository';

@Injectable()
export class ManagerServices {
    private managers: Manager[];

    constructor() {
        this.managers = ManagerRepository.read();
    }

    public create(user: CreateUserDto): Manager {
        const manager = new Manager(user);
        this.managers.push(manager);
        ManagerRepository.write(this.managers);
        return manager;
    }

    public getManager(id: string): { index: number; manager: Manager } {
        const index = this.managers.findIndex((manager: Manager) => manager.idNumber === id);

        if (index !== -1) {
            const manager = this.managers[index];
            return { index, manager };
        }

        throw new Error(`Manager with id number ${id} not found.`);
    }

    public delete(managerId: string): void {
        this.update(managerId, { isActive: false });
    }

    private update(id: string, updates: Partial<Manager>): void {
        const index = this.managers.findIndex((manager: Manager) => manager.idNumber == id);
        this.managers[index] = { ...this.managers[index], ...updates };

        ManagerRepository.write(this.managers);
    }

    public switchCustomerManagement(customerId: string, newManagerId: string, currentManagerId: string): void {
        const currentManagerIndex = this.managers.findIndex((manager: Manager) => manager.idNumber == currentManagerId);
        const newManagerIndex = this.managers.findIndex((manager: Manager) => manager.idNumber == newManagerId);

        const currentManagerUpdated = this.managers[currentManagerIndex]['customersId'].filter((idNumber) => idNumber != customerId);
        this.update(currentManagerId, { customersId: currentManagerUpdated });

        this.managers[newManagerIndex]['customersId'].push(customerId);
        this.update(newManagerId, { customersId: this.managers[newManagerIndex]['customersId'] });
    }

    public addCustomer(customerId: string, managerId: string): void {
        const managerIndex = this.managers.findIndex((manager: Manager) => manager.idNumber === managerId);
        this.managers[managerIndex]['customersId'].push(customerId);
        this.update(managerId, { customersId: this.managers[managerIndex]['customersId'] });
    }
}
