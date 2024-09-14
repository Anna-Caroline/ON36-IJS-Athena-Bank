// src/infrastructure/controllers/banking.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { BankingUseCases } from '../../application/usecases/banking.usecase';

@ApiTags('Banking')
@Controller('banking')
export class BankingController {
    constructor(private readonly bankingUseCases: BankingUseCases) {}

    @Get('managers')
    @ApiQuery({ name: 'managerId', type: String, required: false })
    async getManagers(@Query('managerId') managerId: string) {
        return await this.bankingUseCases.getManagers(managerId);
    }

    @Get('customers')
    @ApiQuery({ name: 'customerId', type: String, required: false })
    async getCustomers(@Query('customerId') customerId: string) {
        return await this.bankingUseCases.getCustomers(customerId);
    }

    @Get('accounts')
    async getAccounts() {
        return await this.bankingUseCases.getAccounts();
    }
}
