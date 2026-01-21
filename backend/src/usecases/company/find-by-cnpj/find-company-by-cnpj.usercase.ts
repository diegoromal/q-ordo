import type { CompanyGateway } from 'src/domain/repositories/company.gateway';
import { CompanyNotFoundUsecaseException } from 'src/usecases/exceptions/company-not-found.usecase.exception';
import type { Usecase } from 'src/usecases/usecase';

export type FindCompanyByCnpjInput = {
  cnpj: string;
};

export type FindCompanyByCnpjOutput = {
  id: string;
  name: string;
  cnpj: string;
  cep: string;
  createdAt: Date;
  updatedAt: Date;
};

export class FindCompanyByCnpjUsecase implements Usecase<
  FindCompanyByCnpjInput,
  FindCompanyByCnpjOutput
> {
  public constructor(private readonly companyGateway: CompanyGateway) {}

  public async execute({
    cnpj,
  }: FindCompanyByCnpjInput): Promise<FindCompanyByCnpjOutput> {
    const aCompany = await this.companyGateway.findByCnpj(cnpj);

    if (!aCompany) {
      throw new CompanyNotFoundUsecaseException(
        `Company not found while finding company with cnpj ${cnpj} in ${FindCompanyByCnpjUsecase.name}`,
        `Empresa não encontrada`,
        FindCompanyByCnpjUsecase.name,
      );
    }

    const output: FindCompanyByCnpjOutput = {
      id: aCompany.getId(),
      name: aCompany.getName(),
      cnpj: aCompany.getCnpj(),
      cep: aCompany.getCep(),
      createdAt: aCompany.getCreatedAt(),
      updatedAt: aCompany.getUpdatedAt(),
    };

    return output;
  }
}
