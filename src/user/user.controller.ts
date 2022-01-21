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
import { EditUserDTO } from './dto/editUser.dto';
import { UserService } from './user.service';
import { Public } from '../auth/public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //CRUD - Create, Read, Update, Delete
  //
  @Public()
  @Get()
  async getUsers(): Promise<UserModel[]> {
    return this.userService.getUsers();
  }
  @Get('/:id')
  async getUserById(@Param('id') id: number): Promise<UserModel> {
    return this.userService.getUserById(id);
  }

  @Public()
  @Post()
  async createUser(@Body() userData: CreateUserDTO): Promise<UserModel> {
    // const { name, email, password } = userData;
    return this.userService.createUser(userData);
  }

  @Put(':id')
  async updateUser(
    @Body() userData: EditUserDTO,
    @Param('id') userId: number,
  ): Promise<UserModel> {
    userData.userId = userId;
    return this.userService.updateUser(userData);
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: number) {
    return this.userService.deleteUser(userId);
  }
}
