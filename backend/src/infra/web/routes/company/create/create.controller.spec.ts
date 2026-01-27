import { Test, TestingModule } from '@nestjs/testing';
import { CreateCompanyRouteController } from './create-company.route.controller';

describe('CreateController', () => {
  let controller: CreateCompanyRouteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateCompanyRouteController],
    }).compile();

    controller = module.get<CreateCompanyRouteController>(
      CreateCompanyRouteController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
