import { Module } from '@nestjs/common';
import { CardController } from '../controllers/card.controller';
import { CreditCardService } from '../../domain/services/credit-card.services';
import { CheckingAccountServices } from '../../domain/services/checking-account.services';
import { CreditCardUseCases } from '../../application/usecases/credit-card.usecase';

@Module({
    imports: [],
    controllers: [CardController],
    providers: [CreditCardUseCases, CreditCardService, CheckingAccountServices],
})
export class CardModule {}
