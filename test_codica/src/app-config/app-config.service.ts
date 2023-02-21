import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Environment, EnvironmentVariables } from './env.validation';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get isProduction(): boolean {
    return (
      this.configService.get(EnvironmentVariables.NODE_ENV) ===
      Environment.Production
    );
  }

  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      type: 'postgres',
      url: this.configService.get(EnvironmentVariables.POSTGRES_URL),
      entities: ['dist/**/*.entity.js'],
      // logging: true,
      // logger: 'simple-console',
    };
  }
}
