import { TaskDTO } from '../dtos/task.dto';
import { Task } from '../entity/task.entity';

export abstract class TaskRepository {
  abstract findAllTasksByUserId(userId: string): Promise<Task[]>;

  abstract createTask(taskDto: TaskDTO): Promise<void>;

  abstract deleteTaskById(id: string): Promise<void>;
}
