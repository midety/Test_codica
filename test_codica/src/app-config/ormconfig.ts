import {
  Environment,
  EnvironmentVariables,
  validationSchema,
} from './env.validation';
import dotenvExpand from 'dotenv-expand';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const { parsed } = dotenvExpand({ parsed: process.env });

const validationResult = validationSchema.validate(parsed, {
  stripUnknown: true,
});

if (validationResult.error) {
  console.error(validationResult.error.message);
  process.exit(0);
}

const { value: envValue } = validationResult;

const connectDB = new DataSource({
  type: 'postgres',
  url: envValue[EnvironmentVariables.POSTGRES_URL],
  entities:
    envValue[EnvironmentVariables.NODE_ENV] === Environment.Production
      ? ['dist/**/*.entity.js']
      : ['src/**/*.entity.ts'],
  migrations: ['migrations/*.ts'],
  synchronize: false,
});

connectDB
  .initialize()
  .then(() => {
    console.log(`Data Source has been initialized`);
  })
  .catch((err) => {
    console.error(`Data Source initialization error`, err);
  });

export default connectDB;
