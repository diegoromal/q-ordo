import type { CompanyGateway } from 'src/domain/repositories/company.gateway';
import { CompanyNotFoundUsecaseException } from 'src/usecases/exceptions/company-not-found.usecase.exception';
import type { Usecase } from 'src/usecases/usecase';

export type FindCompanyByIdInput = {
  id: string;
};

export type FindCompanyByIdOutput = {
  id: string;
  name: string;
  cnpj: string;
  cep: string;
  createdAt: Date;
  updatedAt: Date;
};

export class FindCompanyByIdUsecase implements Usecase<
  FindCompanyByIdInput,
  FindCompanyByIdOutput
> {
  public constructor(private readonly companyGateway: CompanyGateway) {}

  public async execute({
    id,
  }: FindCompanyByIdInput): Promise<FindCompanyByIdOutput> {
    const aCompany = await this.companyGateway.findById(id);

    if (!aCompany) {
      throw new CompanyNotFoundUsecaseException(
        `Company not found while finding company with id ${id} in ${FindCompanyByIdUsecase.name}`,
        `Empresa não encontrada`,
        FindCompanyByIdUsecase.name,
      );
    }

    const output: FindCompanyByIdOutput = {
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
