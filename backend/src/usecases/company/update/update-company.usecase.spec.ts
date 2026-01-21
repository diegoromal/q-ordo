/* eslint-disable @typescript-eslint/unbound-method */
import { UpdateCompanyUsecase } from './update-company.usecase';
import { Company } from 'src/domain/entities/company.entity';
import type { CompanyGateway } from 'src/domain/repositories/company.gateway';
import { CompanyNotFoundUsecaseException } from '../../exceptions/company-not-found.usecase.exception';
import { CnpjAlreadyExistsUsecaseException } from '../../exceptions/cnpj-already-exists.usecase.exception';

describe('Usecases > Company > UpdateCompanyUsecase', () => {
  const makeGateway = (): jest.Mocked<CompanyGateway> =>
    ({
      findByCnpj: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    }) as jest.Mocked<CompanyGateway>;

  it('should update a company when id exists and cnpj is available', async () => {
    const aGateway = makeGateway();
    const createdAt = new Date('2024-01-01T10:00:00.000Z');
    const previousUpdatedAt = new Date('2024-02-01T10:00:00.000Z');

    const aCompany = Company.with({
      id: 'd5e2c6e2-3d1f-4d2a-9e1d-1f3d1a3b2c4d',
      name: 'Acme Inc',
      cnpj: '12.345.678/0001-90',
      cep: '12345-678',
      hasContract: false,
      createdAt,
      updatedAt: previousUpdatedAt,
    });

    aGateway.findById = jest.fn().mockResolvedValue(aCompany);
    aGateway.findByCnpj = jest.fn().mockResolvedValue(null);
    aGateway.update = jest.fn().mockResolvedValue(undefined);

    const usecase = new UpdateCompanyUsecase(aGateway);

    const output = await usecase.execute({
      id: 'd5e2c6e2-3d1f-4d2a-9e1d-1f3d1a3b2c4d',
      name: 'Updated Corp',
      cnpj: '98.765.432/0001-10',
      cep: '87654-321',
    });

    expect(aGateway.findById).toHaveBeenCalledWith(
      'd5e2c6e2-3d1f-4d2a-9e1d-1f3d1a3b2c4d',
    );
    expect(aGateway.findByCnpj).toHaveBeenCalledWith('98.765.432/0001-10');
    expect(aGateway.update).toHaveBeenCalledWith(aCompany);
    expect(output.id).toBe('d5e2c6e2-3d1f-4d2a-9e1d-1f3d1a3b2c4d');
    expect(output.name).toBe('Updated Corp');
    expect(output.cnpj).toBe('98.765.432/0001-10');
    expect(output.cep).toBe('87654-321');
    expect(output.hasContract).toBe(false);
    expect(output.createdAt).toBe(createdAt);
    expect(output.updatedAt.getTime()).toBeGreaterThan(
      previousUpdatedAt.getTime(),
    );
  });

  it('should not check for cnpj conflicts when cnpj is unchanged', async () => {
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
    aGateway.update = jest.fn().mockResolvedValue(undefined);

    const usecase = new UpdateCompanyUsecase(aGateway);

    const output = await usecase.execute({
      id: 'd5e2c6e2-3d1f-4d2a-9e1d-1f3d1a3b2c4d',
      name: 'Updated Corp',
      cnpj: '12.345.678/0001-90',
      cep: '87654-321',
    });

    expect(aGateway.findById).toHaveBeenCalledWith(
      'd5e2c6e2-3d1f-4d2a-9e1d-1f3d1a3b2c4d',
    );
    expect(aGateway.findByCnpj).not.toHaveBeenCalled();
    expect(aGateway.update).toHaveBeenCalledWith(aCompany);
    expect(output.cnpj).toBe('12.345.678/0001-90');
  });

  it('should throw when company is not found', async () => {
    const aGateway = makeGateway();
    aGateway.findById = jest.fn().mockResolvedValue(null);

    const usecase = new UpdateCompanyUsecase(aGateway);

    await expect(
      usecase.execute({
        id: 'd5e2c6e2-3d1f-4d2a-9e1d-1f3d1a3b2c4d',
        name: 'Updated Corp',
        cnpj: '98.765.432/0001-10',
        cep: '87654-321',
      }),
    ).rejects.toThrow(CompanyNotFoundUsecaseException);

    expect(aGateway.update).not.toHaveBeenCalled();
  });

  it('should throw when another company already uses the cnpj', async () => {
    const aGateway = makeGateway();
    const createdAt = new Date('2024-01-01T10:00:00.000Z');
    const updatedAt = new Date('2024-02-01T10:00:00.000Z');

    const currentCompany = Company.with({
      id: 'd5e2c6e2-3d1f-4d2a-9e1d-1f3d1a3b2c4d',
      name: 'Acme Inc',
      cnpj: '12.345.678/0001-90',
      cep: '12345-678',
      hasContract: false,
      createdAt,
      updatedAt,
    });

    const conflictingCompany = Company.with({
      id: 'b1c2d3e4-f5a6-47b8-9c0d-112233445566',
      name: 'Existing Corp',
      cnpj: '98.765.432/0001-10',
      cep: '87654-321',
      hasContract: true,
      createdAt,
      updatedAt,
    });

    aGateway.findById = jest.fn().mockResolvedValue(currentCompany);
    aGateway.findByCnpj = jest.fn().mockResolvedValue(conflictingCompany);

    const usecase = new UpdateCompanyUsecase(aGateway);

    await expect(
      usecase.execute({
        id: 'd5e2c6e2-3d1f-4d2a-9e1d-1f3d1a3b2c4d',
        name: 'Updated Corp',
        cnpj: '98.765.432/0001-10',
        cep: '87654-321',
      }),
    ).rejects.toThrow(CnpjAlreadyExistsUsecaseException);

    expect(aGateway.update).not.toHaveBeenCalled();
  });
});
