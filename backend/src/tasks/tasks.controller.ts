import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { TaskRepository } from './repositories/task.repository';
import { TaskDTO } from './dtos/task.dto';

@Controller('api')
export class TasksController {
  constructor(private taskRepository: TaskRepository) {}

  @Get('/tasks/:userId')
  async findAllTasksById(
    @Param(':userId') userId: string,
    @Res() res: Response,
  ) {
    const tasks = await this.taskRepository.findAllTasksByUserId(userId);

    if (!tasks) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .send('There are no tasks for this UserId');
    }

    return res.status(HttpStatus.OK).send(tasks);
  }

  @Post('/tasks')
  async createTask(@Body() taskDTO: TaskDTO) {
    await this.taskRepository.createTask(taskDTO);
  }

  @Delete('/tasks/:id')
  async deleteTaskById(@Param('id') id: string): Promise<void> {
    await this.taskRepository.deleteTaskById(id);
  }
}
