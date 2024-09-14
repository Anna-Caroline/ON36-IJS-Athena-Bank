import { ManagerUseCases } from './../../application/usecases/manager.usecase';
import { Module } from '@nestjs/common';
import { ManagerServices } from '../../domain/services/manager.services';
import { ManagerController } from '../controllers/manager.controller';
import { ValidateManager } from '../middlewares/manager.middleware';

@Module({
    imports: [],
    controllers: [ManagerController],
    providers: [ManagerUseCases, ManagerServices],
})
export class ManagerModule {
    // configure(consumer: MiddlewareConsumer) {
    //     consumer.apply(ValidateManager).forRoutes(ManagerController);
    // }
}
