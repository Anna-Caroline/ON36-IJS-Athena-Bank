import { Acquirer } from '../enum/acquirer.enum';
import { CardStatus } from '../enum/card-status.enum';
import { CardDetails } from './valueObjects/card-details';

export class CreditCard {
    id: string;
    details: CardDetails;
    usedLimit: number;
    limit: number;
    invoiceDay: number;
    interestRate: 0.005;
    status: CardStatus;

    constructor(
        password: string,
        cardNumber: string,
        securityCode: string,
        expirationDate: Date,
        cardHolderName: string,
        brand: Acquirer,
        invoiceDay: number,
        account: string,
    ) {
        this.id = `${cardNumber}-${securityCode}-${invoiceDay}-${cardHolderName.slice(0, 3).toUpperCase()}`;
        this.details = new CardDetails(cardHolderName, cardNumber, password, securityCode, expirationDate, brand, account);
        this.invoiceDay = invoiceDay;
        this.limit = 500;
        this.usedLimit = 0;
        this.status = CardStatus.BLOCKED;
    }
}
