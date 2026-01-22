import { Body, Controller, Post } from '@nestjs/common';
import type {
  CreateCompanyInput,
  CreateCompanyUsecase,
} from 'src/usecases/company/create/create-company.usecase';
import type {
  CreateCompanyRouteRequest,
  CreateCompanyRouteResponse,
} from './create-company.dto';
import { CreateCompanyPresenter } from './create-company.presenter';

@Controller('companies')
export class CreateCompanyRoute {
  public constructor(
    private readonly createCompanyUsecase: CreateCompanyUsecase,
  ) {}

  @Post()
  public async handle(
    @Body() request: CreateCompanyRouteRequest,
  ): Promise<CreateCompanyRouteResponse> {
    const input: CreateCompanyInput = {
      name: request.name,
      cnpj: request.cnpj,
      cep: request.cep,
    };

    const result = await this.createCompanyUsecase.execute(input);

    const output = CreateCompanyPresenter.toHttp(result);

    return output;
  }
}
