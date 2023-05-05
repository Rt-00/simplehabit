import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { DatabaseService } from 'src/database/database.service';
import { UserRepository } from './repositories/user.repository';
import { UserPrismaRespository } from './repositories/user.prisma.repository.impl';

@Module({
  imports: [UserModule],
  controllers: [UserController],
  providers: [
    DatabaseService,
    {
      provide: UserRepository,
      useClass: UserPrismaRespository,
    },
  ],
})
export class UserModule {}
