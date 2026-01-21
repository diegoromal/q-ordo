/* eslint-disable @typescript-eslint/unbound-method */
import { DeleteCompanyUsecase } from './delete-company.usecase';
import { CompanyNotFoundUsecaseException } from '../../exceptions/company-not-found.usecase.exception';
import type { CompanyGateway } from 'src/domain/repositories/company.gateway';
import { Company } from 'src/domain/entities/company.entity';

describe('Usecases > Company > DeleteCompanyUsecase', () => {
  const makeGateway = (): jest.Mocked<CompanyGateway> =>
    ({
      findByCnpj: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
    }) as jest.Mocked<CompanyGateway>;

  it('should delete a company when id exists', async () => {
    const aGateway = makeGateway();
    const createdAt = new Date('2024-01-01T10:00:00.000Z');
    const updatedAt = new Date('2024-02-01T10:00:00.000Z');
    const aCompany = Company.with({
      id: 'd5e2c6e2-3d1f-4d2a-9e1d-1f3d1a3b2c4d',
      name: 'Acme Inc',
      cnpj: '12.345.678/0001-90',
      cep: '12345-678',
      hasContract: false,
      createdAt,
      updatedAt,
    });

    aGateway.findById = jest.fn().mockResolvedValue(aCompany);
    aGateway.delete = jest.fn().mockResolvedValue(undefined);

    const usecase = new DeleteCompanyUsecase(aGateway);

    const output = await usecase.execute({
      id: 'd5e2c6e2-3d1f-4d2a-9e1d-1f3d1a3b2c4d',
    });

    expect(aGateway.findById).toHaveBeenCalledWith(
      'd5e2c6e2-3d1f-4d2a-9e1d-1f3d1a3b2c4d',
    );
    expect(aGateway.delete).toHaveBeenCalledWith(
      'd5e2c6e2-3d1f-4d2a-9e1d-1f3d1a3b2c4d',
    );
    expect(output).toEqual({
      id: 'd5e2c6e2-3d1f-4d2a-9e1d-1f3d1a3b2c4d',
    });
  });

  it('should throw when company is not found', async () => {
    const aGateway = makeGateway();
    aGateway.findById = jest.fn().mockResolvedValue(null);
    aGateway.delete = jest.fn().mockResolvedValue(undefined);

    const usecase = new DeleteCompanyUsecase(aGateway);

    await expect(
      usecase.execute({
        id: 'd5e2c6e2-3d1f-4d2a-9e1d-1f3d1a3b2c4d',
      }),
    ).rejects.toThrow(CompanyNotFoundUsecaseException);

    expect(aGateway.findById).toHaveBeenCalledWith(
      'd5e2c6e2-3d1f-4d2a-9e1d-1f3d1a3b2c4d',
    );
    expect(aGateway.delete).not.toHaveBeenCalled();
  });
});
