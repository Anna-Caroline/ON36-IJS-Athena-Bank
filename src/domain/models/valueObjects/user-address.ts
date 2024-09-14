export class Address {
    street: string;
    number: string;
    city: string;
    neighborhood: string;
    postalCode: string;
    state: string;

    constructor(street: string, number: string, city: string, neighborhood: string, state: string, postalCode: string) {
        this.street = street;
        this.number = number;
        this.city = city;
        this.neighborhood = neighborhood;
        this.postalCode = postalCode;
        this.state = state;
    }
}
