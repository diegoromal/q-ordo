import { CompanyGateway } from 'src/domain/repositories/company.gateway';
import { CompanyPrismaRepository } from './company.prisma.repository';

export const companyPrismaRepositoryProvider = {
  provide: CompanyGateway,
  useClass: CompanyPrismaRepository,
};
