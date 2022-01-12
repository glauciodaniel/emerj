import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Prisma, User as UserModel } from '@prisma/client';
import { CreateUserDTO } from './dto/createUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //CRUD - Create, Read, Update, Delete
  //
  @Get()
  async getUsers(): Promise<UserModel[]> {
    return this.userService.getUsers();
  }
  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<UserModel> {
    return this.userService.getUserById(id);
  }
  @Post()
  async createUser(@Body() userData: CreateUserDTO): Promise<UserModel> {
    // const { name, email, password } = userData;
    return this.userService.createUser(userData);
  }

  @Put(':id')
  async updateUser() {
    return 'Executando via put, alterando um usuário';
  }
  @Delete(':id')
  async deleteUser() {
    return 'Executando via delete, excluindo um usuário';
  }
}
