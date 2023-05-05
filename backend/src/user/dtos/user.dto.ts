import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { TaskDTO } from 'src/tasks/dtos/task.dto';

export class UserDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsStrongPassword()
  password: string;

  tasks?: TaskDTO[];
}
