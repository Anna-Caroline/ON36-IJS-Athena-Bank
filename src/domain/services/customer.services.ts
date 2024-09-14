import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../application/dto/create-user.dto';
import { Customer } from '../models/customer.model';
import { CustomerRepository } from '../../infrastructure/repository/customer.repository';

@Injectable()
export class CustomerServices {
    private customers: Customer[];

    constructor() {
        this.customers = CustomerRepository.read();
    }

    private throwError(operation: string, error: HttpStatus) {
        throw new HttpException(`${operation} failed`, error);
    }

    private updateCustomer(customerId: string, updates: Partial<Customer>): void {
        const customerIndex = this.customers.findIndex((customer: Customer) => customer.idNumber === customerId);
        if (customerIndex === -1) {
            this.throwError('Customer not found', HttpStatus.NOT_FOUND);
        }
        this.customers[customerIndex] = { ...this.customers[customerIndex], ...updates };
        CustomerRepository.write(this.customers);
    }

    public create(user: CreateUserDto, managerId: string): Customer {
        const customer = new Customer(user, managerId);
        this.customers.push(customer);
        CustomerRepository.write(this.customers);
        return customer;
    }

    public getCustomer(id: string): { index: number; customer: Customer } {
        this.customers = CustomerRepository.read();
        const index = this.customers.findIndex((customer: Customer) => customer.idNumber === id && customer.isActive === true);

        if (index !== -1) {
            const customer = this.customers[index];
            return { index, customer };
        }

        this.throwError(`Customer with id number ${id} not found`, HttpStatus.NOT_FOUND);
    }

    public delete(customerId: string): void {
        this.updateCustomer(customerId, { isActive: false });
    }

    public addAccount(customerId: string, accountNumber: string): void {
        const { customer } = this.getCustomer(customerId);
        const updatedAccountsId = [...customer.accountsId, accountNumber];
        this.updateCustomer(customerId, { accountsId: updatedAccountsId });
    }

    public deleteAccount(customerId: string, accountNumber: string): void {
        const { customer } = this.getCustomer(customerId);
        const updatedAccountsId = customer.accountsId.filter((accountId: string) => accountId !== accountNumber);
        this.updateCustomer(customerId, { accountsId: updatedAccountsId });
    }

    public switchCustomerManagment(customerId: string, newManagerId: string): void {
        this.updateCustomer(customerId, { managerId: newManagerId });
    }
}
