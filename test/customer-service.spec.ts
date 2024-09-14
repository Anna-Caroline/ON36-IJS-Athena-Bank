import { Test, TestingModule } from '@nestjs/testing';
import { CustomerServices } from '../../src/domain/services/customer.services';
import { CreateUserDto } from '../../src/application/dto/create-user.dto';
import { CustomerRepository } from '../../src/infrastructure/repository/customer.repository';
import { Customer } from '../../src/domain/models/customer.model';
import { Address } from '../../src/domain/models/valueObjects/user-address';
import { HttpException } from '@nestjs/common';

jest.mock('../../src/infrastructure/repository/customer.repository');

describe('CustomerServices', () => {
    let service: CustomerServices;
    let mockRepository: jest.Mocked<typeof CustomerRepository>;

    beforeEach(async () => {
        mockRepository = CustomerRepository as jest.Mocked<typeof CustomerRepository>;

        let customers: Customer[] = [
            new Customer(
                {
                    name: 'Mariana Costa',
                    idNumber: '67890',
                    address: new Address('Avenida das Flores', '456', 'Cidade Exemplo 2', 'Estado Exemplo 2', '98765-432', 'Brasil'),
                    phone: '555-6666',
                    dateOfBirth: new Date('1995-05-15'),
                    email: 'mariana.costa@exemplo.com',
                    password: 'senha456',
                },
                '2222',
            ),
        ];

        mockRepository.read.mockReturnValue(customers);
        mockRepository.write.mockImplementation((updatedCustomers: Customer[]) => {
            customers = [...updatedCustomers];
        });

        const module: TestingModule = await Test.createTestingModule({
            providers: [CustomerServices],
        }).compile();

        service = module.get<CustomerServices>(CustomerServices);
    });

    it('should create a customer', () => {
        const createUserDto: CreateUserDto = {
            name: 'Mariana Costa',
            idNumber: '789789',
            address: new Address('Avenida das Flores', '456', 'Cidade Exemplo 2', 'Estado Exemplo 2', '98765-432', 'Brasil'),
            phone: '555-6666',
            dateOfBirth: new Date('1995-05-15'),
            email: 'mariana.costa@exemplo.com',
            password: 'senha456',
        };

        const managerId = '88888';

        const customer = new Customer(createUserDto, managerId);
        mockRepository.write.mockImplementation();

        const createdCustomer = service.create(createUserDto, managerId);
        createdCustomer.id = customer.id;

        expect(createdCustomer).toEqual(customer);
    });

    it('should get a customer', () => {
        const result = service.getCustomer('67890');

        expect(result.index).toBe(0);
    });

    it('should delete a customer', () => {
        const id = '67890';
        service.delete(id);
        expect(() => service.getCustomer('67890')).toThrow(HttpException);
    });

    it('should throw an error if customer is not found', () => {
        expect(() => service.getCustomer('678')).toThrowError(`Customer with id number 678 not found`);
    });

});
