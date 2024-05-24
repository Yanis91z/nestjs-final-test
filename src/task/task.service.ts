import { Injectable } from '@nestjs/common';
import { Task, Prisma } from '@prisma/client';
import { DatabaseService } from '../infrastructure/database/database.service';

@Injectable()
export class TaskService {
    constructor(
        private databaseService: DatabaseService,
    ) { }

    async addTask(
        name: string,
        userId: number,
        priority: number,
    ): Promise<Task> {
        const task = Prisma.validator<Prisma.TaskCreateInput>()({
            name: name,
            user: {
                connect: {
                    id: parseInt(userId.toString()),
                },
            },
            priority: parseInt(priority.toString()),
        });

        return this.databaseService.task.create({
            data: task,
        });
    }

    async getTaskByName(name: string, userId: number): Promise<Task> {
        const whereNameIs = Prisma.validator<Prisma.TaskWhereInput>()({
            name: name,
            AND: {
                userId: parseInt(userId.toString()),
            },
        });

        return this.databaseService.task.findFirst({
            where: whereNameIs,
        });
    }

    async getUserTasks(userId: number): Promise<Task[]> {
        const whereUserIdIs = Prisma.validator<Prisma.TaskWhereInput>()({
            userId: parseInt(userId.toString()),
        });

        return this.databaseService.task.findMany({
            where: whereUserIdIs,
        });
    }

    async resetData(): Promise<Prisma.BatchPayload> {
        return this.databaseService.task.deleteMany();
    }
}