import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { DatabaseService } from 'src/infrastructure/database/database.service';
import { DynamicModule } from '@nestjs/common';

@Module({})
export class TaskModule {
    static register(
        databaseService: DatabaseService,
    ): DynamicModule {
        return {
            module: TaskModule,
            providers: [
                {
                    provide: TaskService,
                    useValue: new TaskService(databaseService),
                },
            ],
            exports: [TaskService],
            controllers: [TaskController],
        };
    }
}
