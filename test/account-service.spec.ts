import { Account } from './../../src/domain/interfaces/account.interface';
import { SavingAccount } from './../../src/domain/models/saving-account.model';
import { Test, TestingModule } from '@nestjs/testing';
import { SavingAccountServices } from '../../src/domain/services/saving-account.services';
import { AccountRepository } from '../../src/infrastructure/repository/account.repository';
import { AccountType } from '../../src/domain/enum/account-type.enum';
import { CreateAccountDto } from '../../src/application/dto/create-account.dto';
import { CreateOperationDto } from '../../src/application/dto/create-operation.dto';
import { Transaction } from '../../src/domain/models/transaction.model';
import { TransactionRepository } from '../../src/infrastructure/repository/transaction.repository';

jest.mock('../../src/infrastructure/repository/account.repository');
jest.mock('../../src/infrastructure/repository/transaction.repository');
jest.mock('../../src/domain/utils/operation-validator');


describe.only('AccountService', () => {
    let service: SavingAccountServices;
    let mockRepository: jest.Mocked<typeof AccountRepository>;
    let mockTransactionRepository: jest.Mocked<typeof TransactionRepository>;


    beforeEach(async () => {
        mockRepository = AccountRepository as jest.Mocked<typeof AccountRepository>;
        mockTransactionRepository = TransactionRepository as jest.Mocked<typeof TransactionRepository>;

        let accounts: SavingAccount[] = [
            new SavingAccount('11122334455', AccountType.Savings, '00098765', '002'),
            new SavingAccount('55566778899', AccountType.Savings, '00054321', '002')
        ];

        let transactions: Transaction[] = new Array<Transaction>();

        accounts[0].balance = 1500;
        accounts[1].balance = 800;

        mockRepository.read.mockReturnValue(accounts);
        mockRepository.write.mockImplementation((account: SavingAccount[]) => {
            accounts = [...account];
        });

        mockTransactionRepository.read.mockReturnValue(transactions);
        mockTransactionRepository.write.mockImplementation((transaction: Transaction[]) => {
            transactions = [...transaction];
        });

        const module: TestingModule = await Test.createTestingModule({
            providers: [SavingAccountServices],
        }).compile();

        service = module.get<SavingAccountServices>(SavingAccountServices);
    });

    it('should create an account', () => {
        const createAccountDto: CreateAccountDto = {
            holderDocument: '11122334455',
            accountType: AccountType.Savings,
        };

        let expected = service.create(createAccountDto);
        let account = mockRepository.read();
        expect(account[2]).toEqual(expected);
    });

    it('should deposit amount into SavingAccount', () => {
        const transactionDto: CreateOperationDto = {
            amount: 300,
            description: 'Bonus Deposit',
            receiver: 'Ana Pereira',
            receiverAccount: '00098765',
            debtor: '',
            debtorAccount: ''
        };


    });
});