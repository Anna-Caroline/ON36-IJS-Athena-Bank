import { Module } from '@nestjs/common';
import { BankingServices } from '../../domain/services/banking.services';
import { BankingController } from '../controllers/banking.controller';
import { BankingUseCases } from '../../application/usecases/banking.usecase';
@Module({
    imports: [],
    controllers: [BankingController],
    providers: [BankingUseCases, BankingServices],
})
export class BankingModule {}
