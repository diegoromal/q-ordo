import { Injectable } from '@nestjs/common';
import { Company, Prisma } from 'src/generated/prisma/client';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

@Injectable()
export class CompanyEntityService {
  constructor(private prisma: PrismaService) {}

  async company(
    companyWhereUniqueInput: Prisma.CompanyWhereUniqueInput,
  ): Promise<Company | null> {
    return this.prisma.company.findUnique({ where: companyWhereUniqueInput });
  }

  async companies(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CompanyWhereUniqueInput;
    where?: Prisma.CompanyWhereInput;
    orderBy?: Prisma.CompanyOrderByWithRelationInput;
  }): Promise<Company[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.company.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createCompany(data: Prisma.CompanyCreateInput): Promise<Company> {
    return this.prisma.company.create({
      data,
    });
  }

  async updateCompany(params: {
    where: Prisma.CompanyWhereUniqueInput;
    data: Prisma.CompanyUpdateInput;
  }): Promise<Company> {
    const { where, data } = params;
    return this.prisma.company.update({
      data,
      where,
    });
  }

  async deleteCompany(where: Prisma.CompanyWhereUniqueInput): Promise<Company> {
    return this.prisma.company.delete({
      where,
    });
  }
}
