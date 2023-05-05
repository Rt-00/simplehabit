import { UserDTO } from '../dtos/user.dto';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from 'src/database/database.service';
import { UserRepository } from './user.repository';
import { Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';

@Injectable()
export class UserPrismaRespository implements UserRepository {
  constructor(private prisma: DatabaseService) {}

  async findById(userId: string): Promise<User> {
    return await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        tasks: true,
      },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });
  }

  async findAllUsers(): Promise<User[]> {
    return await this.prisma.user.findMany({
      include: {
        tasks: true,
      },
    });
  }

  async createUser(userDTO: UserDTO): Promise<void> {
    if (userDTO.tasks) {
      await this.prisma.user.create({
        data: {
          email: userDTO.email,
          password: bcrypt.hashSync(userDTO.password, 10),
          name: userDTO.name,
          tasks: {
            create: userDTO.tasks,
          },
        },
      });
    }

    await this.prisma.user.create({
      data: {
        email: userDTO.email,
        password: bcrypt.hashSync(userDTO.password, 10),
        name: userDTO.name,
      },
    });
  }

  async deleteUserById(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
