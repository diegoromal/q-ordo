import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserEntityService } from 'src/domain/entities/user/user.entity.service';
import { Prisma, User } from 'src/generated/prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  @Inject()
  private readonly userService: UserEntityService;

  async signin(
    params: Prisma.UserCreateInput,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.userService.user({ email: params.email });

    if (!user) throw new NotFoundException('User not found');

    const passwordMath = await bcrypt.compare(params.password, user.password);

    if (!passwordMath) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password, ...result } = user;

    return result;
  }
}
