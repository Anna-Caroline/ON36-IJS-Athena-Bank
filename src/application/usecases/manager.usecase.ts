// src/application/use-cases/manager-use-cases.ts
import { Injectable } from '@nestjs/common';
import { ManagerServices } from '../../domain/services/manager.services';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class ManagerUseCases {
    constructor(private readonly managerService: ManagerServices) {}

    async createManager(manager: CreateUserDto): Promise<any> {
        return await this.managerService.create(manager);
    }

    async deleteManager(managerId: string): Promise<void> {
        await this.managerService.delete(managerId);
    }
}
