/* eslint-disable @typescript-eslint/unbound-method */
import { CreateCompanyUsecase } from './create-company.usecase';
import { CnpjAlreadyExistsUsecaseException } from '../../exceptions/cnpj-already-exists.usecase.exception';
import { Company } from 'src/domain/entities/company.entity';
import type { CompanyGateway } from 'src/domain/repositories/company.gateway';

describe('Usecases > Company > CreateCompanyUsecase', () => {
  const makeGateway = (): jest.Mocked<CompanyGateway> =>
    ({
      findByCnpj: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    }) as jest.Mocked<CompanyGateway>;

  it('should create a company when cnpj is available', async () => {
    const aGateway = makeGateway();
    aGateway.findByCnpj = jest.fn().mockResolvedValue(null);
    aGateway.create = jest.fn().mockResolvedValue(undefined);

    const usecase = new CreateCompanyUsecase(aGateway);

    const output = await usecase.execute({
      name: 'Acme Inc',
      cnpj: '12.345.678/0001-90',
      cep: '12345-678',
    });

    expect(output.id).toBeDefined();
    expect(output.id.length).toBe(36);
    expect(aGateway.findByCnpj).toHaveBeenCalledWith('12.345.678/0001-90');
    expect(aGateway.create).toHaveBeenCalledWith(expect.any(Company));
  });

  it('should throw when cnpj already exists', async () => {
    const aGateway = makeGateway();
    const existingCompany = Company.create({
      name: 'Existing Corp',
      cnpj: '12.345.678/0001-90',
      cep: '12345-678',
    });

    aGateway.findByCnpj = jest.fn().mockResolvedValue(existingCompany);

    const usecase = new CreateCompanyUsecase(aGateway);

    await expect(
      usecase.execute({
        name: 'New Corp',
        cnpj: '12.345.678/0001-90',
        cep: '12345-678',
      }),
    ).rejects.toThrow(CnpjAlreadyExistsUsecaseException);

    expect(aGateway.create).not.toHaveBeenCalled();
  });
});
