import { CustomerRepository } from '../../infrastructure/repository/customer.repository';
import { AccountRepository } from '../../infrastructure/repository/account.repository';
import { ManagerRepository } from '../../infrastructure/repository/manager.repository';

export class BankingServices {
    private _agency: string = '01';

    public getAccounts() {
        const accounts = AccountRepository.read();
        return accounts;
    }

    public getCustomers(customerId?: string) {
        const customers = CustomerRepository.read();

        if (customerId) return customers.filter((customer) => customer.idNumber === customerId);

        return customers;
    }

    public getManagers(managerId?: string) {
        const managers = ManagerRepository.read();

        if (managerId) return managers.filter((manager) => manager.idNumber === managerId);

        return managers;
    }

    public accountNumberGenerator() {
        const accounts = this.getAccounts();
        const accountNumber = `${accounts.length.toString().padStart(4, '0')}`;
        return accountNumber;
    }

    get agency() {
        return this._agency;
    }
}
