import { CustomerUseCases } from './../../application/usecases/customer.usecase';
import { Module } from '@nestjs/common';
import { CustomerServices } from '../../domain/services/customer.services';
import { CustomerController } from '../controllers/customer.controller';
import { ManagerServices } from '../../domain/services/manager.services';

@Module({
    imports: [],
    controllers: [CustomerController],
    providers: [CustomerUseCases, CustomerServices, ManagerServices],
})
export class CustomerModule {}
