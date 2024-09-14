// src/application/use-cases/customer-use-cases.ts
import { Injectable } from '@nestjs/common';
import { CustomerServices } from '../../domain/services/customer.services';
import { ManagerServices } from '../../domain/services/manager.services';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class CustomerUseCases {
    constructor(
        private readonly customerService: CustomerServices,
        private readonly managerService: ManagerServices,
    ) {}

    async createCustomer(managerId: string, customer: CreateUserDto): Promise<any> {
        const result = await this.customerService.create(customer, managerId);
        await this.managerService.addCustomer(result.idNumber, managerId);
        return result;
    }

    async deleteCustomer(customerId: string): Promise<void> {
        await this.customerService.delete(customerId);
    }
}
