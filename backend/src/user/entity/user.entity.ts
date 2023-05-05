import { TaskDTO } from 'src/tasks/dtos/task.dto';

export class User {
  id: string;
  email: string;
  name: string;
  password: string;
  tasks?: TaskDTO[];
}
