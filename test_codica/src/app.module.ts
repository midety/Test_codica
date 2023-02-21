import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigService } from './app-config/app-config.service';
import { AppConfigModule } from './app-config/app-config.module';
import { ApiModule } from './api/api.modules';

@Module({
  imports: [
    ApiModule,
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      useExisting: AppConfigService,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
