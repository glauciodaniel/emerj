import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User as UserModel, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDTO } from './dto/editUser.dto';
import { UtilsService } from '../utils/utils.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private utilsService: UtilsService,
  ) {}

  async getUsers(): Promise<UserModel[]> {
    return this.prisma.user.findMany({});
  }
  async getUserById(id: number): Promise<UserModel> {
    return this.prisma.user.findFirst({
      where: { id: Number(id) },
    });
  }

  //se seus códigos forem muito úteis, cria um NPM package.
  //privado, repositório do NPM.
  async createUser(data: Prisma.UserCreateInput): Promise<UserModel> {
    //ao criar a senha estamos enviando o parâmetro data.
    data.password = await this.utilsService.convertPassword(data.password);
    //data.password = senha criptografada
    const user = await this.prisma.user.create({
      data,
    });

    //envio do email se user existe!
    //...
    if (user) {
      //envie o email
      const send = await this.utilsService.sendMail(
        user.email,
        'Emerj - Bem Vindo',
      );
    } else {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Falha ao cadastrar usuário',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    return user;
  }

  async updateUser(userData: EditUserDTO): Promise<UserModel> {
    const { name, email, password, userId } = userData;
    const hashedPassword = await this.utilsService.convertPassword(password);

    return this.prisma.user.update({
      where: {
        id: +userId,
      },
      data: { name, email, password: hashedPassword },
    });
  }

  async deleteUser(userId: number): Promise<UserModel> {
    return this.prisma.user.delete({
      where: { id: +userId },
    });
  }
}
