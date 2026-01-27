import { Module } from '@nestjs/common';
import { CreateCompanyRouteController } from './routes/company/create/create-company.route.controller';
import { FindByCnpjCompanyRouteController } from './routes/company/find-by-cnpj/find-by-cnpj-company.route.controller';
import { FindByIdCompanyRouteController } from './routes/company/find-by-id/find-by-id-company.route.controller';
import { CreateUserRouteController } from './routes/user/create/create-user.route.controller';
import { FindByIdUserRouteController } from './routes/user/find-by-id/find-by-id-user.route.controller';
import { CompanyEntityService } from 'src/domain/entities/company/company.entity.service';
import { UserEntityService } from 'src/domain/entities/user/user.entity.service';
import { DatabaseModule } from 'src/infra/database/database.module';
import { AuthController } from './routes/auth/auth.controller';
import { AuthService } from './routes/auth/auth.service';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateCompanyRouteController,
    FindByCnpjCompanyRouteController,
    FindByIdCompanyRouteController,
    CreateUserRouteController,
    FindByIdUserRouteController,
    AuthController,
  ],
  providers: [CompanyEntityService, UserEntityService, AuthService],
})
export class WebModule {}
