// src/application/use-cases/banking-use-cases.ts
import { Injectable } from '@nestjs/common';
import { BankingServices } from '../../domain/services/banking.services';

@Injectable()
export class BankingUseCases {
    constructor(private readonly bankingServices: BankingServices) {}

    async getManagers(managerId?: string): Promise<any> {
        return this.bankingServices.getManagers(managerId);
    }

    async getCustomers(customerId?: string): Promise<any> {
        return this.bankingServices.getCustomers(customerId);
    }

    async getAccounts(): Promise<any> {
        return this.bankingServices.getAccounts();
    }
}
