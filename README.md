# Keshohin: A Backend API for Online Cosmetics Ecommerce Services

Keshohin is a backend API that enables online cosmetics ecommerce services to manage products, orders, customers, and other features such as authentication, authorization, validation, error handling. Keshohin aims to simplify the development and maintenance of online cosmetics ecommerce services by providing a robust and scalable solution.

## Project Objectives

- Design and implement a RESTful API using Node.js and Nest.js framework
- Use MySQL (Planet Scale) as the database to store users, profiles, locations, orders, products, etc.
- Use Prisma as an ORM library to interact with MySQL (Planet Scale)
- Use JWT for authentication and authorization
- Use Render to deploy the project on the internet

## Project Phases

1. **Planning**: Conduct research and analysis on multiple well-known cosmetics websites and their needs
2. **Designing**: Create the database schema using Prisma models and methods, and design the API endpoints using Nest.js controllers and services. Test the API functionality using Postman
3. **Developing**: Write the code for the API using Node.js modules such as prisma, nodemail, mailGen, cloudinary, etc. Follow best practices such as modularization and documentation
4. **Deploying**: Deploy the API on Render and configure the settings such as environment variables and logging levels

## Testing

The collection test is in the `Keshohin.postman_collection.json` file.

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

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

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
