import { Module } from '@nestjs/common';
import { AccountController } from '../controllers/account.controller';
import { CheckingAccountServices } from '../../domain/services/checking-account.services';
import { SavingAccountServices } from '../../domain/services/saving-account.services';
import { SavingAccount } from '../../domain/models/saving-account.model';
import { CheckingAccount } from '../../domain/models/checking-account.model';
import { CustomerServices } from '../../domain/services/customer.services';
import { AccountUseCases } from '../../application/usecases/account.usecase';
import { BusinessAccountServices } from '../../domain/services/business-account.services';
import { BusinessDocumentValidator } from '../../application/services/business-document-validator';

@Module({
    imports: [],
    controllers: [AccountController],
    providers: [
        AccountUseCases,
        BusinessAccountServices,
        CheckingAccountServices,
        SavingAccountServices,
        CheckingAccount,
        SavingAccount,
        CustomerServices,
        BusinessDocumentValidator
    ],
})
export class AccountModule {}
