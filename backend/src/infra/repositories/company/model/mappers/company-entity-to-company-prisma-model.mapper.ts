import type { Company } from 'src/domain/entities/company.entity';
import { CompanyPrismaModel } from '../company.prisma.model';

export class CompanyEntityToCompanyPrismaModel {
  public static map(company: Company): CompanyPrismaModel {
    const aModel: CompanyPrismaModel = {
      id: company.getId(),
      name: company.getName(),
      cnpj: company.getCnpj(),
      cep: company.getCep(),
      hasContract: company.getHasContract(),
      createdAt: company.getCreatedAt(),
      updatedAt: company.getUpdatedAt(),
    };
    return aModel;
  }
}
