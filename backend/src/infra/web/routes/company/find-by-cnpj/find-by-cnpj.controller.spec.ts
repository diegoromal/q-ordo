import { Test, TestingModule } from '@nestjs/testing';
import { FindByCnpjCompanyRouteController } from './find-by-cnpj-company.route.controller';

describe('FindByCnpjController', () => {
  let controller: FindByCnpjCompanyRouteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FindByCnpjCompanyRouteController],
    }).compile();

    controller = module.get<FindByCnpjCompanyRouteController>(
      FindByCnpjCompanyRouteController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
