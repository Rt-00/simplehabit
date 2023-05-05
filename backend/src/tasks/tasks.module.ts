import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { DatabaseService } from 'src/database/database.service';
import { TaskRepository } from './repositories/task.repository';
import { TaskPrismaRespository } from './repositories/task.prisma.repository.impl';

@Module({
  imports: [TasksModule],
  controllers: [TasksController],
  providers: [
    DatabaseService,
    {
      provide: TaskRepository,
      useClass: TaskPrismaRespository,
    },
  ],
})
export class TasksModule {}
