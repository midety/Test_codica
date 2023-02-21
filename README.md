Steps to start project (with docker):

1. Add environment variables (fill with preferable values): 
```
NODE_ENV=development
POSTGRES_USER=<database username>
POSTGRES_PASSWORD=<database password>
POSTGRES_DB=<database table name>
POSTGRES_HOST=<database host>
POSTGRES_PORT=<database port>
POSTGRES_URL=postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}
```

2. Start Docker Compose: `docker-compouse up`

3. Open [Api Docs](http://localhost:3000/api/v1/docs)

Steps to start project (without docker):

1. Add environment variables (fill with preferable values): 
```
NODE_ENV=development
POSTGRES_USER=<database username>
POSTGRES_PASSWORD=<database password>
POSTGRES_DB=<database table name>
POSTGRES_HOST=<database host>
POSTGRES_PORT=<database port>
POSTGRES_URL=postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}
```

2. Start project: `npm run start:dev`

3. Open [Api Docs](http://localhost:3000/api/v1/docs)


Requirements:
- Node: 16.14.1
- NPM: 6.14.17
- Database: PgSQL 14.1

Libraries:
dotenv-expand: allows to expand envs
joi: env validation
