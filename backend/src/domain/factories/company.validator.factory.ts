import type { Company } from '../entities/company.entity';
import type { Validator } from '../shared/validators/validator';
import { CompanyZodValidator } from '../validators/company.zod.validator';

export class CompanyValidatorFactory {
  public static create(): Validator<Company> {
    return CompanyZodValidator.create();
  }
}
