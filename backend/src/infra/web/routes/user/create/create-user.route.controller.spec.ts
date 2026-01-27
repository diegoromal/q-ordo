import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserRouteController } from './create-user.route.controller';

describe('CreateController', () => {
  let controller: CreateUserRouteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateUserRouteController],
    }).compile();

    controller = module.get<CreateUserRouteController>(
      CreateUserRouteController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
