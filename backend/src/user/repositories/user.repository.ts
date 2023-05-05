import { UserDTO } from '../dtos/user.dto';
import { User } from '../entity/user.entity';

export abstract class UserRepository {
  abstract createUser(userDTO: UserDTO): Promise<void>;

  abstract findAllUsers(): Promise<User[]>;

  abstract findByEmail(email: string): Promise<User>;

  abstract findById(id: string): Promise<User>;

  abstract deleteUserById(id: string): Promise<void>;
}
