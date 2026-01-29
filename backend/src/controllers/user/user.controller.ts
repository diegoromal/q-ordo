import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { Prisma, User as UserModel } from 'src/generated/prisma/client';
import { UserService } from 'src/services/user/user.service';

@Controller('user')
export class UserController {
  @Inject()
  private readonly userService: UserService;

  @Post()
  async signupUser(
    @Body() userData: Prisma.UserCreateInput,
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<UserModel | null> {
    return this.userService.user({ id });
  }

  @Put(':id')
  async updateUser(
    @Body() userData: Prisma.UserUpdateInput,
    @Param('id') id: string,
  ): Promise<UserModel> {
    return this.userService.updateUser({ where: { id }, data: userData });
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<null> {
    this.userService.deleteUser({ id });
    return null;
  }
}
