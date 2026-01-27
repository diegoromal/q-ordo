import { Test, TestingModule } from '@nestjs/testing';
import { FindByIdCompanyRouteController } from './find-by-id-company.route.controller';

describe('FindByIdController', () => {
  let controller: FindByIdCompanyRouteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FindByIdCompanyRouteController],
    }).compile();

    controller = module.get<FindByIdCompanyRouteController>(
      FindByIdCompanyRouteController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
