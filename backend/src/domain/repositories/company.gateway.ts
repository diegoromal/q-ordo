import type { Company } from '../entities/company.entity';

export abstract class CompanyGateway {
  abstract findByCnpj(cnpj: string): Promise<Company | null>;
  abstract findById(id: string): Promise<Company | null>;
  abstract create(company: Company): Promise<void>;
}
