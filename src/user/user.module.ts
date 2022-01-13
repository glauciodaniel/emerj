import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { UtilsService } from '../utils/utils.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, UtilsService],
})
export class UserModule {}
