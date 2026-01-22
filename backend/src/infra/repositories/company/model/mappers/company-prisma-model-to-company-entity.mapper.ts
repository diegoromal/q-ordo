import { Company } from 'src/domain/entities/company.entity';
import { CompanyPrismaModel } from '../company.prisma.model';

export class CompanyPrismaModelToCompanyEntityMapper {
  public static map(company: CompanyPrismaModel): Company {
    const aCompany = Company.with({
      id: company.id,
      name: company.name,
      cnpj: company.cnpj,
      cep: company.cep,
      hasContract: company.hasContract,
      createdAt: company.createdAt,
      updatedAt: company.updatedAt,
    });
    return aCompany;
  }
}
