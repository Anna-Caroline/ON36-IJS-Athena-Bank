import { CreateUserDto } from '../dto/create-user.dto';

export interface ICustomerUseCases {
    createCustomer(managerId: string, customer: CreateUserDto): Promise<any>;
    deleteCustomer(customerId: string): Promise<void>;
}
