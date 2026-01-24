import { Module } from '@nestjs/common';
import { companyPrismaRepositoryProvider } from './prisma/company/company.prisma.repository.provider';

@Module({
  providers: [companyPrismaRepositoryProvider],
  exports: [companyPrismaRepositoryProvider],
})
export class DatabaseModule {}
