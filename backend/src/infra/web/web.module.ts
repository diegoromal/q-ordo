import { UsecaseModule } from 'src/usecases/usecase.module';
import { CreateCompanyRoute } from './routes/company/create/create-company.route';
import { Module } from '@nestjs/common';

@Module({
  imports: [UsecaseModule],
  controllers: [CreateCompanyRoute],
  providers: [],
})
export class WebModule {}
