import Joi from 'joi';

export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

export enum EnvironmentVariables {
  NODE_ENV = 'NODE_ENV',

  POSTGRES_URL = 'POSTGRES_URL',
}

export const validationSchema = Joi.object({
  [EnvironmentVariables.NODE_ENV]: Joi.string()
    .valid(...Object.values(Environment))
    .default(Environment.Production),
  [EnvironmentVariables.POSTGRES_URL]: Joi.string().required(),
});
