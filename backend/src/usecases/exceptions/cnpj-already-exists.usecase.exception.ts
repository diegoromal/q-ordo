import { UsecaseException } from './usecase.exception';

export class CnpjAlreadyExistsUsecaseException extends UsecaseException {
  public constructor(
    internalMessage: string,
    externalMessage?: string,
    context?: string,
  ) {
    super(internalMessage, externalMessage, context);
  }
}
