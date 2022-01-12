import { Injectable } from '@nestjs/common';
import { User as UserModel, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers(): Promise<UserModel[]> {
    return this.prisma.user.findMany({});
  }
  async getUserById(id: number): Promise<UserModel> {
    return this.prisma.user.findFirst({
      where: { id: +id },
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<UserModel> {
    return this.prisma.user.create({
      data,
    });
  }
}
