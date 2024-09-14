import { CreateOperationDto } from 'src/application/dto/create-operation.dto';


export interface AccountOperations {
    deposit(transaction: CreateOperationDto): void;
    withdraw(transaction: CreateOperationDto): void;
    transfer(transaction: CreateOperationDto): void;
}
