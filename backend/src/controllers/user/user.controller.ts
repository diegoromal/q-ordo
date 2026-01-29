import { Body, Controller, Inject, Post } from '@nestjs/common';
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
}
