import { Injectable } from '@nestjs/common';
import type { CompanyGateway } from 'src/domain/repositories/company.gateway';
import { CnpjAlreadyExistsUsecaseException } from '../../exceptions/cnpj-already-exists.usecase.exception';
import { CompanyNotFoundUsecaseException } from '../../exceptions/company-not-found.usecase.exception';
import type { Usecase } from '../../usecase';

export type UpdateCompanyInput = {
  id: string;
  name: string;
  cnpj: string;
  cep: string;
  hasContract: boolean;
};

export type UpdateCompanyOutput = {
  id: string;
  name: string;
  cnpj: string;
  cep: string;
  hasContract: boolean;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class UpdateCompanyUsecase implements Usecase<
  UpdateCompanyInput,
  UpdateCompanyOutput
> {
  public constructor(private readonly companyGateway: CompanyGateway) {}

  public async execute({
    id,
    name,
    cnpj,
    cep,
    hasContract,
  }: UpdateCompanyInput): Promise<UpdateCompanyOutput> {
    const aCompany = await this.companyGateway.findById(id);

    if (!aCompany) {
      throw new CompanyNotFoundUsecaseException(
        `Company not found while updating company with id ${id} in ${UpdateCompanyUsecase.name}`,
        `Empresa não encontrada`,
        UpdateCompanyUsecase.name,
      );
    }

    const isUpdatingCnpj = aCompany.getCnpj() !== cnpj;

    if (isUpdatingCnpj) {
      const companyWithSameCnpj = await this.companyGateway.findByCnpj(cnpj);

      if (companyWithSameCnpj && companyWithSameCnpj.getId() !== id) {
        throw new CnpjAlreadyExistsUsecaseException(
          `Cnpj already exists while updating company with cnpj ${cnpj} in ${UpdateCompanyUsecase.name}`,
          `O cnpj já está sendo utilizado`,
          UpdateCompanyUsecase.name,
        );
      }
    }

    aCompany.update({ name, cnpj, cep, hasContract });

    await this.companyGateway.update(aCompany);

    const output: UpdateCompanyOutput = {
      id: aCompany.getId(),
      name: aCompany.getName(),
      cnpj: aCompany.getCnpj(),
      cep: aCompany.getCep(),
      hasContract: aCompany.getHasContract(),
      createdAt: aCompany.getCreatedAt(),
      updatedAt: aCompany.getUpdatedAt(),
    };

    return output;
  }
}
