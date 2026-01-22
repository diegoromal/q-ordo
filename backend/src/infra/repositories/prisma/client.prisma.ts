import 'dotenv/config';
import { PrismaClient } from 'generated/prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

const url = process.env.DATABASE_URL;
if (!url) throw new Error('DATABASE_URL is missing');

const adapter = new PrismaLibSql({ url });

export const prismaClient = new PrismaClient({ adapter });
