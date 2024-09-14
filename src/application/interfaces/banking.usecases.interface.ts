export interface IBankingUseCases {
    getManagers(managerId?: string): Promise<any>;
    getCustomers(customerId?: string): Promise<any>;
    getAccounts(): Promise<any>;
}
