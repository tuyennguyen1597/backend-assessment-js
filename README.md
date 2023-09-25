I have mistakenly created a feature branch in mindarc repository. That why I did migrated to here 
https://github.com/mindarc/backend-assessment-js/compare/master...tuyennguyen1597:feat/jade-nguyen?expand=1

## Description

Mindarc Product API repository built with [Nest](https://github.com/nestjs/nest) Framework

Please check Documentation PDF to find the database credential

## Tech Stacks

- NestJS
- NodeJS
- Express
- Typescript
- TypeORM
- Jest
- Docker
- Eslint
- Prettier
- Swagger
- MySQL

## Prerequisites

- nodejs 18
- docker
- npm

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```


## Change credential in the .ENV file
The credential is provided in the PDF file

## Running with docker (need to have docker)

```bash
# development
$ docker-compose up
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Swagger API Documentation

Go to `${BaseURL}/` to view all the API documentations
The default port is 3000
