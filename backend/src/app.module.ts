import { Module } from '@nestjs/common';
import { DatabaseModule } from './resources/database/database.module';
import { AuthModule } from './resources/auth/auth.module';
import { UserModule } from './resources/user/user.module';
import { CompanyModule } from './resources/company/company.module';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule, CompanyModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
