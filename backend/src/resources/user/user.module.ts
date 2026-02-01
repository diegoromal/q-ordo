import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { DatabaseModule } from '../../resources/database/database.module';
import { UserService } from './user.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
