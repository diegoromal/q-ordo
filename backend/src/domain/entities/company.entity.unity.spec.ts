import { randomUUID } from 'crypto';
import { ValidatorDomainException } from '../shared/exceptions/validator-domain.exception';
import { Company } from './company.entity';

describe('Domain > Entities > Company', () => {
  describe('create', () => {
    it('should create a company when passing valid data', () => {
      const aName = 'Acme Inc';
      const aCnpj = '12.345.678/0001-90';
      const aCep = '12345-678';

      const aCompany = Company.create({
        name: aName,
        cnpj: aCnpj,
        cep: aCep,
      });

      expect(aCompany).toBeInstanceOf(Company);
      expect(aCompany.getName()).toBe(aName);
      expect(aCompany.getCnpj()).toBe(aCnpj);
      expect(aCompany.getCep()).toBe(aCep);
      expect(aCompany.getHasContract()).toBe(false);
      expect(aCompany.getId()).toBeDefined();
      expect(aCompany.getId().length).toBe(36);
      expect(aCompany.getCreatedAt()).toBeInstanceOf(Date);
      expect(aCompany.getUpdatedAt()).toBeInstanceOf(Date);
    });

    it('should throw an error when passing invalid data', () => {
      const anInvalidCep = 12345 as unknown as string;

      const createInvalidCompany = () =>
        Company.create({
          name: 'Acme Inc',
          cnpj: '12.345.678/0001-90',
          cep: anInvalidCep,
        });

      expect(createInvalidCompany).toThrow(ValidatorDomainException);
    });
  });

  describe('with', () => {
    it('should create a company with persisted data', () => {
      const id = randomUUID();
      const createdAt = new Date('2024-01-01T00:00:00Z');
      const updatedAt = new Date('2024-02-01T00:00:00Z');

      const aCompany = Company.with({
        id,
        name: 'Persisted Corp',
        cnpj: '98.765.432/0001-10',
        cep: '87654-321',
        hasContract: true,
        createdAt,
        updatedAt,
      });

      expect(aCompany).toBeInstanceOf(Company);
      expect(aCompany.getId()).toBe(id);
      expect(aCompany.getName()).toBe('Persisted Corp');
      expect(aCompany.getCnpj()).toBe('98.765.432/0001-10');
      expect(aCompany.getCep()).toBe('87654-321');
      expect(aCompany.getHasContract()).toBe(true);
      expect(aCompany.getCreatedAt()).toBe(createdAt);
      expect(aCompany.getUpdatedAt()).toBeInstanceOf(Date);
    });

    it('should throw an error when passing invalid persisted data', () => {
      const anInvalidId = 'invalid-uuid';

      const createInvalidPersistedCompany = () =>
        Company.with({
          id: anInvalidId,
          name: 'Persisted Corp',
          cnpj: '98.765.432/0001-10',
          cep: '87654-321',
          hasContract: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

      expect(createInvalidPersistedCompany).toThrow(ValidatorDomainException);
    });
  });

  describe('update', () => {
    it('should update company data and refresh updatedAt', () => {
      const createdAt = new Date('2024-01-01T00:00:00Z');
      const updatedAt = new Date('2024-02-01T00:00:00Z');

      const aCompany = Company.with({
        id: randomUUID(),
        name: 'Persisted Corp',
        cnpj: '98.765.432/0001-10',
        cep: '87654-321',
        hasContract: true,
        createdAt,
        updatedAt,
      });

      const previousUpdatedAt = aCompany.getUpdatedAt();

      aCompany.update({
        name: 'Updated Corp',
        cnpj: '11.222.333/0001-44',
        cep: '11111-222',
        hasContract: false,
      });

      expect(aCompany.getName()).toBe('Updated Corp');
      expect(aCompany.getCnpj()).toBe('11.222.333/0001-44');
      expect(aCompany.getCep()).toBe('11111-222');
      expect(aCompany.getHasContract()).toBe(false);
      expect(aCompany.getUpdatedAt().getTime()).toBeGreaterThan(
        previousUpdatedAt.getTime(),
      );
    });

    it('should not persist changes when validation fails', () => {
      const aCompany = Company.create({
        name: 'Valid Corp',
        cnpj: '12.345.678/0001-90',
        cep: '12345-678',
      });

      const previousUpdatedAt = aCompany.getUpdatedAt();

      const updateWithInvalidCep = () =>
        aCompany.update({
          name: 'Updated Corp',
          cnpj: '98.765.432/0001-10',
          cep: 123 as unknown as string,
          hasContract: true,
        });

      expect(updateWithInvalidCep).toThrow(ValidatorDomainException);
      expect(aCompany.getName()).toBe('Valid Corp');
      expect(aCompany.getCnpj()).toBe('12.345.678/0001-90');
      expect(aCompany.getCep()).toBe('12345-678');
      expect(aCompany.getHasContract()).toBe(false);
      expect(aCompany.getUpdatedAt()).toBe(previousUpdatedAt);
    });
  });
});
