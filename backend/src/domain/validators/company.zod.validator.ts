import { ZodUtils } from '../../shared/utils/zod-utils';
import type { Company } from '../entities/company.entity';
import type { Validator } from '../shared/validators/validator';
import { z } from 'zod';
import { ValidatorDomainException } from '../shared/exceptions/validator-domain.exception';
import { DomainException } from '../shared/exceptions/domain.exception';

export class CompanyZodValidator implements Validator<Company> {
  public constructor() {}

  public static create(): CompanyZodValidator {
    return new CompanyZodValidator();
  }

  public validate(input: Company): void {
    try {
      this.getZodSchema().parse(input);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const message = ZodUtils.formatZodError(error);
        throw new ValidatorDomainException(
          `Error while validating company ${input.getId()}: ${message}`,
          `Os dados para a criação da empresa são inválidos: ${message}`,
          CompanyZodValidator.name,
        );
      }

      const err = error as Error;

      throw new DomainException(
        `Unexpected error while validating company ${input.getId()}: ${err.message}`,
        `houve um erro inesperado ao validadar os dados da empresa`,
        CompanyZodValidator.name,
      );
    }
  }

  private getZodSchema() {
    const zodSchema = z.object({
      id: z.string().uuid(),
      name: z.string(),
      cnpj: z.string(),
      cep: z.string(),
      hasContract: z.boolean(),
      createdAt: z.date(),
      updatedAt: z.date(),
    });

    return zodSchema;
  }
}
