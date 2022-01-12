import { Injectable } from '@nestjs/common';
import { User as UserModel, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDTO } from './dto/editUser.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers(): Promise<UserModel[]> {
    return this.prisma.user.findMany({});
  }
  async getUserById(id: number): Promise<UserModel> {
    return this.prisma.user.findFirst({
      where: { id: Number(id) },
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<UserModel> {
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(userData: EditUserDTO): Promise<UserModel> {
    const { name, email, password, userId } = userData;

    return this.prisma.user.update({
      where: {
        id: +userId,
      },
      data: { name, email, password },
    });
  }

  async deleteUser(userId: number): Promise<UserModel> {
    return this.prisma.user.delete({
      where: { id: +userId },
    });
  }
}
