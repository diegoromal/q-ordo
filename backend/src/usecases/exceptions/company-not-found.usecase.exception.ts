import { UsecaseException } from './usecase.exception';

export class CompanyNotFoundUsecaseException extends UsecaseException {
  public constructor(
    internalMessage: string,
    externalMessage?: string,
    context?: string,
  ) {
    super(internalMessage, externalMessage, context);
  }
}
