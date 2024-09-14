import { Body, Controller, Delete, Patch, Post, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../../application/dto/create-user.dto';
import { CustomerUseCases } from '../../application/usecases/customer.usecase';

@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
    constructor(private readonly customerUseCases: CustomerUseCases) {}

    @Post(':managerId')
    async create(@Param('managerId') managerId: string, @Body() customer: CreateUserDto) {
        try {
            const result = await this.customerUseCases.createCustomer(managerId, customer);
            return { statusCode: HttpStatus.CREATED, message: 'Customer created successfully', data: result };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':customerId')
    async delete(@Param('customerId') customerId: string) {
        try {
            await this.customerUseCases.deleteCustomer(customerId);
            return { statusCode: HttpStatus.OK, message: 'Customer deleted successfully' };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
