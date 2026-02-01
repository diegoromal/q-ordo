import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma, User } from 'src/generated/prisma/client';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  @Inject()
  private readonly userService: UserService;

  @Inject()
  private readonly jwtService: JwtService;

  async signin(
    params: Prisma.UserCreateInput,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.user({ email: params.email });

    if (!user) throw new NotFoundException('User not found');

    const passwordMath = await bcrypt.compare(params.password, user.password);

    if (!passwordMath) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { userId: user.id, companyId: user.companyId };

    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
