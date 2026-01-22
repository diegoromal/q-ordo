import type { CreateCompanyOutput } from 'src/usecases/company/create/create-company.usecase';
import type { CreateCompanyRouteResponse } from './create-company.dto';

export class CreateCompanyPresenter {
  public static toHttp(input: CreateCompanyOutput): CreateCompanyRouteResponse {
    const response: CreateCompanyRouteResponse = {
      id: input.id,
    };

    return response;
  }
}
