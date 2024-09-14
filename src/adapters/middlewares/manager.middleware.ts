import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ManagerRepository } from '../../infrastructure/repository/manager.repository';

@Injectable()
export class ValidateManager implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const managerId = req.query.managerId as string;

        if (!managerId) {
            throw new HttpException('Manager ID is required', HttpStatus.BAD_REQUEST);
        }

        const managers = ManagerRepository.read();
        const managerExists = managers.some((manager) => manager.idNumber === managerId);

        if (!managerExists) {
            throw new HttpException('Manager not found', HttpStatus.NOT_FOUND);
        }

        next();
    }
}
