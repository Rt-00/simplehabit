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
import { UserDTO } from './dtos/user.dto';
import { UserRepository } from './repositories/user.repository';

@Controller('api')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Get('/user')
  async findAllUsers(@Res() res: Response) {
    const users = await this.userRepository.findAllUsers();
    res.status(HttpStatus.OK).send(users);
  }

  @Get('/user/:id')
  async findUserById(@Param('id') id: string) {
    const user = this.userRepository.findById(id);
    return user;
  }

  @Post('/user')
  async createUser(@Body() userDTO: UserDTO, @Res() res: Response) {
    const existUserWithEmail = await this.userRepository.findByEmail(
      userDTO.email,
    );

    if (existUserWithEmail) {
      return res
        .status(HttpStatus.CONFLICT)
        .send('User with email: ' + userDTO.email + ' already exists.');
    }

    res
      .status(HttpStatus.CREATED)
      .send(await this.userRepository.createUser(userDTO));
  }

  @Delete('/user/:id')
  async deleteUserById(@Param('id') id: string, @Res() res: Response) {
    const existUserById = await this.userRepository.findById(id);

    if (!existUserById) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .send('User Id: ' + id + ' not found !');
    }

    await this.userRepository.deleteUserById(id);
    return res.status(HttpStatus.OK).send('User has been deleted successfully');
  }
}
