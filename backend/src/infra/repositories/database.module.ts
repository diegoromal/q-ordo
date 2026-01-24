import { Module } from '@nestjs/common';
import { CompanyPrismaRepositoryProvider } from './prisma/company/company.prisma.repository.provider';

@Module({
  providers: [CompanyPrismaRepositoryProvider],
  exports: [CompanyPrismaRepositoryProvider],
})
export class DatabaseModule {}
