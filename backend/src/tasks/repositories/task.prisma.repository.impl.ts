import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { DatabaseService } from 'src/database/database.service';
import { Task } from '../entity/task.entity';
import { TaskDTO } from '../dtos/task.dto';

@Injectable()
export class TaskPrismaRespository implements TaskRepository {
  constructor(private prisma: DatabaseService) {}

  async deleteTaskById(id: string): Promise<void> {
    await this.prisma.task.delete({
      where: {
        id: id,
      },
    });
  }

  async createTask(taskDto: TaskDTO) {
    await this.prisma.task.create({
      data: {
        title: taskDto.title,
        userId: taskDto.userId,
      },
    });
  }

  async findAllTasksByUserId(userId: string): Promise<Task[]> {
    return await this.prisma.task.findMany({
      where: {
        userId: userId,
      },
    });
  }
}
