import { Body, Controller, Delete, Get, Post, Query, HttpException, HttpStatus } from '@nestjs/common';
import { CreateAccountDto } from '../../application/dto/create-account.dto';
import { CreateOperationDto } from '../../application/dto/create-operation.dto';
import { AccountType } from '../../domain/enum/account-type.enum';
import { AccountUseCases } from '../../application/usecases/account.usecase';

@ApiTags('Account Operations')
@Controller('account')
export class AccountController {
    constructor(private readonly accountUseCases: AccountUseCases) { }

    @Post('')
    async create(@Query() createAccountDto: CreateAccountDto) {
        try {
            const account = await this.accountUseCases.createAccount(createAccountDto);
            return { statusCode: HttpStatus.CREATED, message: 'Account created successfully', data: account };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('')
    @ApiQuery({ name: 'accountNumber', type: String })
    @ApiQuery({ name: 'accountType', enum: AccountType })
    async get(@Query('accountNumber') accountNumber: string, @Query('accountType') accountType: AccountType) {
        try {
            const account = await this.accountUseCases.getAccount(accountNumber, accountType);
            return { statusCode: HttpStatus.OK, data: account };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Delete('')
    @ApiQuery({ name: 'accountNumber', type: String })
    @ApiQuery({ name: 'accountType', enum: AccountType })
    async delete(@Query('accountNumber') accountNumber: string, @Query('accountType') accountType: AccountType) {
        try {
            await this.accountUseCases.deleteAccount(accountNumber, accountType);
            return { statusCode: HttpStatus.OK, message: 'Account deleted successfully' };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('deposit')
    @ApiQuery({ name: 'accountReceiverType', enum: AccountType })
    async deposit(@Body() transaction: CreateOperationDto, @Query('accountReceiverType') accountReceiverType: AccountType) {
        try {
            await this.accountUseCases.deposit(transaction, accountReceiverType);
            return { statusCode: HttpStatus.OK, message: 'Deposit successful' };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('withdraw')
    @ApiQuery({ name: 'accountReceiverType', enum: AccountType })
    async withdraw(@Body() transaction: CreateOperationDto, @Query('accountReceiverType') accountReceiverType: AccountType) {
        try {
            await this.accountUseCases.withdraw(transaction, accountReceiverType);
            return { statusCode: HttpStatus.OK, message: 'Withdrawal successful' };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('transfer')
    @ApiQuery({ name: 'sourceAccountType', enum: AccountType })
    async transfer(@Body() transaction: CreateOperationDto, @Query('sourceAccountType') sourceAccountType: AccountType) {
        try {
            await this.accountUseCases.transfer(transaction, sourceAccountType);
            return { statusCode: HttpStatus.OK, message: 'Transfer successful' };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('statement')
    @ApiQuery({ name: 'accountNumber', type: String })
    @ApiQuery({ name: 'accountType', enum: AccountType })
    async statement(@Query('accountNumber') accountNumber: string, @Query('accountType') accountType: AccountType) {
        try {
            const statement = await this.accountUseCases.statement(accountNumber, accountType);
            return { statusCode: HttpStatus.OK, data: statement };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }
}
