import { Module } from '@nestjs/common';
import { CreateCompanyUsecase } from './company/create/create-company.usecase';
import { FindCompanyByCnpjUsecase } from './company/find-by-cnpj/find-company-by-cnpj.usecase';
import { FindCompanyByIdUsecase } from './company/find-by-id/find-company-by-id.usecase';
import { UpdateCompanyUsecase } from './company/update/update-company.usecase';
import { DeleteCompanyUsecase } from './company/delete/delete-company.usecase';
import { DatabaseModule } from 'src/infra/repositories/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    CreateCompanyUsecase,
    FindCompanyByCnpjUsecase,
    FindCompanyByIdUsecase,
    UpdateCompanyUsecase,
    DeleteCompanyUsecase,
  ],
  exports: [
    CreateCompanyUsecase,
    FindCompanyByCnpjUsecase,
    FindCompanyByIdUsecase,
    UpdateCompanyUsecase,
    DeleteCompanyUsecase,
  ],
})
export class UsecaseModule {}
