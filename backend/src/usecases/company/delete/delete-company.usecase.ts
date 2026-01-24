import type { CompanyGateway } from 'src/domain/repositories/company.gateway';
import { CompanyNotFoundUsecaseException } from '../../exceptions/company-not-found.usecase.exception';
import type { Usecase } from '../../usecase';
import { Injectable } from '@nestjs/common';

export type DeleteCompanyInput = {
  id: string;
};

export type DeleteCompanyOutput = {
  id: string;
};

@Injectable()
export class DeleteCompanyUsecase implements Usecase<
  DeleteCompanyInput,
  DeleteCompanyOutput
> {
  public constructor(private readonly companyGateway: CompanyGateway) {}

  public async execute({
    id,
  }: DeleteCompanyInput): Promise<DeleteCompanyOutput> {
    const aCompany = await this.companyGateway.findById(id);

    if (!aCompany) {
      throw new CompanyNotFoundUsecaseException(
        `Company not found while deleting company with id ${id} in ${DeleteCompanyUsecase.name}`,
        `Empresa não encontrada`,
        DeleteCompanyUsecase.name,
      );
    }

    await this.companyGateway.delete(id);

    const output: DeleteCompanyOutput = { id };

    return output;
  }
}
