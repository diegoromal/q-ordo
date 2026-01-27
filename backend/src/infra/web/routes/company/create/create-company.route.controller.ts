import { Body, Controller, Post } from '@nestjs/common';
import { CompanyEntityService } from 'src/domain/entities/company/company.entity.service';
import { Prisma } from 'src/generated/prisma/client';
import { CompanyModel } from 'src/generated/prisma/models';

@Controller('company')
export class CreateCompanyRouteController {
  constructor(private readonly companyEntityService: CompanyEntityService) {}

  @Post()
  async createCompany(
    @Body() companyData: Prisma.CompanyCreateInput,
  ): Promise<CompanyModel> {
    return this.companyEntityService.createCompany(companyData);
  }
}
