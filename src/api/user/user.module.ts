import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { BcryptService } from 'src/utils/bcrypt/bcrypt.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, BcryptService],
})
export class UserModule {}
