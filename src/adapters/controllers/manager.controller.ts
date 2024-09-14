// src/infrastructure/controllers/manager.controller.ts
import { Body, Controller, Delete, HttpException, HttpStatus, Patch, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../../application/dto/create-user.dto';
import { ManagerUseCases } from '../../application/usecases/manager.usecase';

@ApiTags('Manager')
@Controller('manager')
export class ManagerController {
    constructor(private readonly managerUseCases: ManagerUseCases) {}

    @Post(':id')
    async create(@Body() manager: CreateUserDto) {
        try {
            const result = await this.managerUseCases.createManager(manager);
            return { statusCode: HttpStatus.CREATED, message: 'Manager created successfully', data: result };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':id')
    @ApiQuery({ name: 'managerId', type: String })
    async delete(@Query('managerId') managerId: string) {
        try {
            await this.managerUseCases.deleteManager(managerId);
            return { statusCode: HttpStatus.OK, message: 'Manager deleted successfully' };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
