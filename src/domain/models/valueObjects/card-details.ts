import { Acquirer } from '../../enum/acquirer.enum';

export class CardDetails {
    cardHolderName: string;
    number: string;
    password: string;
    securityCode: string;
    expirationDate: Date;
    brand: Acquirer;
    account: string;

    constructor(
        cardHolderName: string,
        number: string,
        password: string,
        securityCode: string,
        expirationDate: Date,
        brand: Acquirer,
        account: string,
    ) {
        this.cardHolderName = cardHolderName;
        this.number = number;
        this.password = password;
        this.securityCode = securityCode;
        this.expirationDate = expirationDate;
        this.brand = brand;
        this.account = account;
    }
}
