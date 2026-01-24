import { Company } from 'src/domain/entities/company.entity';
import { CompanyGateway } from 'src/domain/repositories/company.gateway';
import { prismaClient } from '../client.prisma';
import { CompanyPrismaModelToCompanyEntityMapper } from './model/mappers/company-prisma-model-to-company-entity.mapper';
import { CompanyEntityToCompanyPrismaModel } from './model/mappers/company-entity-to-company-prisma-model.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CompanyPrismaRepository extends CompanyGateway {
  public constructor() {
    super();
  }

  public async findByCnpj(cnpj: string): Promise<Company | null> {
    const aModel = await prismaClient.company.findUnique({
      where: { cnpj: cnpj },
    });

    if (!aModel) {
      return null;
    }

    const aCompany = CompanyPrismaModelToCompanyEntityMapper.map(aModel);

    return aCompany;
  }

  public async findById(id: string): Promise<Company | null> {
    const aModel = await prismaClient.company.findUnique({
      where: { id: id },
    });

    if (!aModel) {
      return null;
    }

    const aCompany = CompanyPrismaModelToCompanyEntityMapper.map(aModel);

    return aCompany;
  }

  public async create(company: Company): Promise<void> {
    const aModel = CompanyEntityToCompanyPrismaModel.map(company);
    await prismaClient.company.create({ data: aModel });
  }

  public async update(company: Company): Promise<void> {
    await prismaClient.company.update({
      where: { id: company.getId() },
      data: {
        name: company.getName(),
        cnpj: company.getCnpj(),
        cep: company.getCep(),
        hasContract: company.getHasContract(),
        updatedAt: company.getUpdatedAt(),
      },
    });
  }

  public async delete(id: string): Promise<void> {
    await prismaClient.company.delete({ where: { id: id } });
  }
}
