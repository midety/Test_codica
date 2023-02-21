import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './app-config.service';
import { validationSchema } from './env.validation';

@Module({
  imports: [ConfigModule.forRoot({ expandVariables: true, validationSchema })],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
