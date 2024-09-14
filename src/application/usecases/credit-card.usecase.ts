// src/application/use-cases/credit-card-use-cases.ts
import { Injectable } from '@nestjs/common';
import { CheckingAccountServices } from '../../domain/services/checking-account.services';
import { CreditCardService } from '../../domain/services/credit-card.services';
import { CreateCreditCardDto } from '../dto/create-card.dto';
import { CreatePurchaseDto } from '../dto/create-purchase.dto';

@Injectable()
export class CreditCardUseCases {
    constructor(
        private readonly checkingAccountService: CheckingAccountServices,
        private readonly cardService: CreditCardService,
    ) {}

    async createCreditCard(createCreditCardDto: CreateCreditCardDto): Promise<any> {
        const card = this.cardService.create(createCreditCardDto);
        await this.checkingAccountService.addCard(createCreditCardDto.account, card.id);
        return card;
    }

    async createPurchase(createPurchaseDto: CreatePurchaseDto): Promise<void> {
        await this.cardService.purchase(createPurchaseDto);
    }

    async getInvoice(cardId: string, month: number, year: number): Promise<any> {
        // Validar os parâmetros
        if (month < 1 || month > 12 || year < 1900) {
            throw new Error('Invalid month or year');
        }

        return this.cardService.getInvoice(cardId, month, year);
    }
}
