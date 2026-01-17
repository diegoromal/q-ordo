export class Exception extends Error {
  private readonly internalMessage: string;
  private readonly externalMessage: string;
  private readonly context: string;

  constructor(
    internalMessage: string,
    externalMessage?: string,
    context?: string,
  ) {
    super(internalMessage);
    this.internalMessage = internalMessage;
    this.externalMessage = externalMessage || '';
    this.context = context || '';
    this.name = Exception.name;
  }

  public getInternalMessage(): string {
    return (this, this.internalMessage);
  }

  public getExternalMessage(): string {
    return (this, this.externalMessage);
  }

  public getContext(): string {
    return (this, this.context);
  }
}
