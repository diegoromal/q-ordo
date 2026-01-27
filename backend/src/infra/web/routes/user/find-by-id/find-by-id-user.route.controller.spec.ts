import { Test, TestingModule } from '@nestjs/testing';
import { FindByIdUserRouteController } from './find-by-id-user.route.controller';

describe('FindByIdController', () => {
  let controller: FindByIdUserRouteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FindByIdUserRouteController],
    }).compile();

    controller = module.get<FindByIdUserRouteController>(
      FindByIdUserRouteController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
