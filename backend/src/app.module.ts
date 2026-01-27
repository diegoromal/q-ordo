import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database/database.module';
import { WebModule } from './infra/web/web.module';

@Module({
  imports: [DatabaseModule, WebModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
