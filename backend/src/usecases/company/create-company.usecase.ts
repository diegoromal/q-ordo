import { Injectable } from "@nestjs/common";
import type { Usecase } from "../usecase";
import type { CompanyGateway } from "src/domain/repositories/company.gateway";
import { CnpjAlreadyExistsUsecaseException } from "../exceptions/cnpj-already-exists.usecase.exception";
import { Company } from "src/domain/entities/company.entity";

export type CreateCompanyInput = {
  name: string;
  cnpj: string;
  cep: string;
}

export type CreateCompanyOutput = {
    id: string
}

@Injectable()
export class CreateCompanyUsecase implements Usecase<CreateCompanyInput, CreateCompanyOutput> {
    public constructor(private readonly companyGateway: CompanyGateway) {}

    public async execute({
        name, cnpj, cep
    }: CreateCompanyInput): Promise<CreateCompanyOutput> {
        const existentCompany = await this.companyGateway.findByCnpj(cnpj)

        if(existentCompany) {
            throw new CnpjAlreadyExistsUsecaseException(
                `Cnpj already exists while creating company with cnpj ${cnpj} in ${CreateCompanyUsecase.name}`,
                `O cnpj já está sendo utilizado`,
                CreateCompanyUsecase.name
            )
        }

        const aCompany = Company.create({name, cnpj, cep})

        await this.companyGateway.create(aCompany);

        const output: CreateCompanyOutput = {
            id: aCompany.getId(),
        };

        return output;
  }
}