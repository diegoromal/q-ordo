import { Utils } from '../../shared/utils/utils';
import { Entity } from '../shared/entities/entity';
import { CompanyValidatorFactory } from '../factories/company.validator.factory';

export type CompanyCreateDto = {
  name: string;
  cnpj: string;
  cep: string;
};

export type CompanyUpdateDto = {
  name: string;
  cnpj: string;
  cep: string;
  hasContract: boolean;
};

export type CompanyWithDto = {
  id: string;
  name: string;
  cnpj: string;
  cep: string;
  hasContract: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export class Company extends Entity {
  private constructor(
    id: string,
    private name: string,
    private cnpj: string,
    private cep: string,
    private hasContract: boolean,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super(id, createdAt, updatedAt);
    this.validate();
  }

  public static create({ name, cnpj, cep }: CompanyCreateDto): Company {
    const id = Utils.generateUUID();
    const hasContract = false;
    const createdAt = new Date();
    const updatedAt = new Date();

    return new Company(id, name, cnpj, cep, hasContract, createdAt, updatedAt);
  }

  public static with({
    id,
    name,
    cnpj,
    cep,
    hasContract,
    createdAt,
    updatedAt,
  }: CompanyWithDto): Company {
    return new Company(id, name, cnpj, cep, hasContract, createdAt, updatedAt);
  }

  protected validate(): void {
    CompanyValidatorFactory.create().validate(this);
  }

  public update({ name, cnpj, cep }: CompanyUpdateDto): void {
    const previousState = {
      name: this.name,
      cnpj: this.cnpj,
      cep: this.cep,
      updatedAt: this.updatedAt,
    };

    this.name = name;
    this.cnpj = cnpj;
    this.cep = cep;
    this.hasUpdated();

    try {
      this.validate();
    } catch (error) {
      this.name = previousState.name;
      this.cnpj = previousState.cnpj;
      this.cep = previousState.cep;
      this.updatedAt = previousState.updatedAt;

      throw error;
    }
  }

  public getName(): string {
    return this.name;
  }

  public getCnpj(): string {
    return this.cnpj;
  }
  public getCep(): string {
    return this.cep;
  }
  public getHasContract(): boolean {
    return this.hasContract;
  }
}
