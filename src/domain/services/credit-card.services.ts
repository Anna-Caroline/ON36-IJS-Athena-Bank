import { randomBytes } from 'crypto';
import { CreditCard } from '../models/credit-card.model';
import { CreatePurchaseDto } from '../../application/dto/create-purchase.dto';
import { Invoice } from '../models/invoice.model';
import { AccountOperationDetails } from '../models/valueObjects/account-operation-details';
import { CardRepository } from 'src/infrastructure/repository/card.repository';
import { CreateCreditCardDto } from '../../application/dto/create-card.dto';
import { TransactionRepository } from 'src/infrastructure/repository/transaction.repository';
import { Transaction } from '../models/transaction.model';
import { TransactionType } from 'src/domain/enum/transaction-type.enum';
import { TransactionStatus } from '../enum/transaction-status.enum';

export class CreditCardService {
    private cards: CreditCard[];

    constructor() {
        this.cards = CardRepository.read();
    }

    public create({ cardHolderName, password, brand, invoiceDay, account }: CreateCreditCardDto): CreditCard {
        const card = new CreditCard(
            password,
            this.generateCardNumber(),
            this.generateSecurityCode(),
            this.generateExpirationDate(),
            cardHolderName,
            brand,
            invoiceDay,
            account,
        );

        this.cards.push(card);
        CardRepository.write(this.cards);

        return card;
    }

    private getCard(cardNumber: string): { index: number; card: CreditCard } {
        const index = this.cards.findIndex((card: CreditCard) => card.details.number === cardNumber);

        if (index !== -1) {
            const card = this.cards[index];
            return { index, card };
        }

        throw new Error(`Account with number ${cardNumber} not found.`);
    }

    public purchase(purchase: CreatePurchaseDto) {
        const { index, card } = this.getCard(purchase.cardNumber);

        if (card.limit - card.usedLimit - purchase.details.amount >= 0) {
            this.createInstallments(
                purchase.details.amount,
                purchase.installments,
                card.details.cardHolderName,
                purchase.details.debtorAccount,
                purchase.details.receiver,
                purchase.details.receiverAccount,
                purchase.details.description,
            );

            this.cards[index].usedLimit += purchase.details.amount;
            CardRepository.write(this.cards);
        } else {
            throw new Error(`Your purchase failed because you do not have enough limit.`);
        }
    }

    public getInvoice(cardId: string, month: number, year: number): Invoice {
        const { card } = this.getCard(cardId);

        const startDate = new Date(year, month - 2, card.invoiceDay);
        const endDate = new Date(year, month - 1, card.invoiceDay);

        const invoice = this.generateInvoice(cardId, startDate, endDate);

        return invoice;
    }

    private generateInvoice(cardId: string, startDate: Date, endDate: Date): Invoice {
        const { card } = this.getCard(cardId);

        const transactions = TransactionRepository.read();

        const invoice = new Invoice(startDate);

        const monthInvoice = transactions.filter(
            (transaction) =>
                transaction.source.debtorAccount == card.details.account &&
                new Date(transaction.capturedDate) >= startDate &&
                new Date(transaction.capturedDate) <= endDate &&
                transaction.type === TransactionType.credit_card &&
                transaction.status === TransactionStatus.pending,
        );

        monthInvoice.forEach((transaction) => {
            invoice.totalDue += transaction.amount;
            invoice.installments.push(transaction);
        });

        return invoice;
    }

    private createInstallments(
        totalDue: number,
        installmentQuantity: number,
        sourceDocument: string,
        sourceAccountNumber: string,
        receiverDocument: string,
        receiverAccountNumber: string,
        description: string,
    ): void {
        const transactions = TransactionRepository.read();

        const amountPerInstallment = totalDue / installmentQuantity;
        const operational = new AccountOperationDetails(sourceDocument, sourceAccountNumber, receiverDocument, receiverAccountNumber);

        const issueDay = new Date();

        for (let installment = 1; installment <= installmentQuantity; installment++) {
            const transaction = new Transaction(amountPerInstallment, TransactionType.credit_card, description, operational);

            const installmentDate = new Date(issueDay);

            installmentDate.setMonth(issueDay.getMonth() + installment);
            installmentDate.setDate(issueDay.getDate());

            transaction.capturedDate = installmentDate;
            transactions.push(transaction);
        }

        TransactionRepository.write(transactions);
    }

    private generateExpirationDate(): Date {
        const yearsFromNow = 3;
        const today = new Date();
        today.setFullYear(today.getFullYear() + yearsFromNow);

        return today;
    }

    private generateCardNumber(): string {
        const number = randomBytes(6).toString('hex').padStart(12, '0');
        return number.replace(/(.{4})/g, '$1 ').trim();
    }

    private generateSecurityCode(): string {
        return (Math.floor(Math.random() * 900) + 100).toString();
    }
}
