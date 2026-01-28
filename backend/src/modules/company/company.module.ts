import { Module } from '@nestjs/common';
import { CompanyController } from '../../controllers/company/company.controller';
import { CompanyService } from '../../services/company/company.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CompanyController],
  providers: [CompanyService],
  exports: [CompanyService],
})
export class CompanyModule {}
