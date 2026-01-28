import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { CompanyModule } from './modules/company/company.module';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule, CompanyModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
