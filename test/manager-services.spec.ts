import { Test, TestingModule } from '@nestjs/testing';
import { ManagerServices } from '../../src/domain/services/manager.services';
import { Manager } from '../../src/domain/models/manager.model';
import { ManagerRepository } from '../../src/infrastructure/repository/manager.repository';
import { CreateUserDto } from '../../src/application/dto/create-user.dto';
import { CustomerRepository } from '../../src/infrastructure/repository/customer.repository';
import { Customer } from '../../src/domain/models/customer.model';
import { Address } from '../../src/domain/models/valueObjects/user-address';

jest.mock('../../src/infrastructure/repository/manager.repository');
jest.mock('../../src/infrastructure/repository/customer.repository');

describe('ManagerServices', () => {
    let service: ManagerServices;
    let mockRepository: jest.Mocked<typeof ManagerRepository>;
    let mockCustomerRepository: jest.Mocked<typeof CustomerRepository>;

    beforeEach(async () => {
        mockRepository = ManagerRepository as jest.Mocked<typeof ManagerRepository>;

        let managers: Manager[] = [
            new Manager({
                name: 'Carlos Oliveira',
                idNumber: '67890',
                address: new Address('Rua Secundária', '789', 'Cidade Exemplo 2', 'Estado Exemplo 2', '98765-432', 'Brasil'),
                phone: '555-7777',
                dateOfBirth: new Date('1985-05-05'),
                email: 'carlos.oliveira@exemplo.com',
                password: 'senhaabc',
            }),
            new Manager({
                name: 'Maria Santos',
                idNumber: '09876',
                address: new Address('Praça Central', '101', 'Cidade Exemplo 2', 'Estado Exemplo 2', '87654-321', 'Brasil'),
                phone: '555-7778',
                dateOfBirth: new Date('1988-08-08'),
                email: 'maria.santos@exemplo.com',
                password: 'senhadef',
            }),
        ];

        mockRepository.read.mockReturnValue(managers);
        mockRepository.write.mockImplementation((updatedManagers: Manager[]) => {
            managers = [...updatedManagers];
        });

        const customer = new Customer(
            {
                name: 'Maria Santos',
                idNumber: '022222',
                address: new Address('Praça Central', '101', 'Cidade Exemplo 2', 'Estado Exemplo 2', '87654-321', 'Brasil'),
                phone: '555-7778',
                dateOfBirth: new Date('1988-08-08'),
                email: 'maria.santos@exemplo.com',
                password: 'senhadef',
            },
            '67890',
        );
        mockCustomerRepository = CustomerRepository as jest.Mocked<typeof CustomerRepository>;

        mockCustomerRepository.read.mockReturnValue([customer]);

        const module: TestingModule = await Test.createTestingModule({
            providers: [ManagerServices],
        }).compile();

        service = module.get<ManagerServices>(ManagerServices);
    });

    it('should create a manager', () => {
        const createUserDto: CreateUserDto = {
            name: 'Carlos Oliveira',
            idNumber: '987654',
            address: new Address('Rua Secundária', '789', 'Cidade Exemplo 2', 'Estado Exemplo 2', '98765-432', 'Brasil'),
            phone: '555-7777',
            dateOfBirth: new Date('1985-05-05'),
            email: 'carlos.oliveira@exemplo.com',
            password: 'senhaabc',
        };

        const manager = new Manager(createUserDto);
        mockRepository.write.mockImplementation();

        const createdManager = service.create(createUserDto);
        createdManager.id = manager.id;

        expect(createdManager).toEqual(manager);
    });

    it('should get a manager', () => {
        const result = service.getManager('67890');

        expect(result.index).toBe(0);
    });

    it('should throw an error if manager is not found', () => {
        expect(() => service.getManager('6789')).toThrowError('Manager with id number 6789 not found');
    });

    it('should delete a manager', () => {
        const id = '987654';
        service.delete(id);

        expect(() => service.getManager(id)).toThrowError(`Manager with id number ${id} not found`);
    });

    it('should add a customer to the manager and call repository write', () => {
        const customerId = '000001';
        const manager = service.getManager('67890').manager;

        service.addCustomer(customerId, manager.idNumber);

        expect(manager.customersId).toContain(customerId);
        expect(mockRepository.write).toHaveBeenCalled();
    });

    it('should switch customer management between managers', () => {
        const customerId = '022222';
        const currentManager = service.getManager('09876').manager;

        const newManager = service.getManager('67890').manager;

        service.switchCustomerManagement(customerId, newManager.idNumber, currentManager.idNumber);

        expect(currentManager.customersId).not.toContain(customerId);
        expect(newManager.customersId).toContain(customerId);
        expect(mockRepository.write).toHaveBeenCalled();
    });
});
