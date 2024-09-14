import { randomUUID } from 'crypto';
import { Address } from './valueObjects/user-address';

export class User {
    id: string;
    name: string;
    idNumber: string;
    address: Address;
    phone: string;
    dateOfBirth: Date;
    email: string;
    password: string;
    isActive: boolean;

    constructor(name: string, nationalId: string, address: Address, phone: string, dateOfBirth: Date, email: string, password: string) {
        this.id = randomUUID().toString();
        this.idNumber = nationalId;
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.password = password;
        this.isActive = true;
    }
}
