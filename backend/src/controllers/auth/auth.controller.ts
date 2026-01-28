import { Body, Controller, Inject, Post } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma/client';
import { AuthService } from 'src/services/auth/auth.service';

@Controller('auth')
export class AuthController {
  @Inject()
  private readonly authService: AuthService;

  @Post('signin')
  signin(@Body() body: Prisma.UserCreateInput) {
    return this.authService.signin(body);
  }
}
