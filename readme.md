# MSJ-CLASSROOM-API

REST API for msj-classroom-apps.

## Requirements

latest stable version of [Node.js](https://nodejs.org/).

latest stable version of [PostgreSQL](https://www.postgresql.org/)

for getting benefits from [sequelize-cli](https://github.com/sequelize/cli) install it with following command`npm i -g sequelize-cli`

## Getting Started

Application requires next actions to be done before using it:

- create PostgreSQL database according to **db options** of [development config file](https://github.com/jscodegeek/msj-classroom-api-app/blob/master/src/config/development.js) 

- clone repository `git clone git@github.com:jscodegeek/msj-classroom-api-app.git`

- in order to install required dependencies run `npm i`

***

## Contributing:

### HOW TO add endpoint:

  - [x] create route in [routes](https://github.com/jscodegeek/msj-classroom-api-app/blob/master/src/routes) folder. **handler creation described several steps below**
  - [x] in case you create new file(for routes) you should add it to [index](https://github.com/jscodegeek/msj-classroom-api-app/blob/master/src/routes/index.js)
  - [x] create handler for route in [controllers](https://github.com/jscodegeek/msj-classroom-api-app/blob/master/src/controllers) folder
  - [x] in case you create new file(for handlers) you should add it to [index](https://github.com/jscodegeek/msj-classroom-api-app/blob/master/src/controllers/index.js)

***

### HOW TO add model:

  - [x] create model in [models](https://github.com/jscodegeek/msj-classroom-api-app/blob/master/src/models) folder using sequelize-cli `sequelize model:generate --name YOUR_MODEL_NAME` or you can apply your favourite approach, whatever it is.
  - [x] in case you create new file(model) you should add it to [index](https://github.com/jscodegeek/msj-classroom-api-app/blob/master/src/models/index.js) **models object** which will be exported.

**NOTE** in case you create model or change its schema you should **create migration**. That is described in [migrations section](https://github.com/jscodegeek/msj-classroom-api-app/blob/master/src/readme#how-to-add-migration)

***

### HOW TO add migration:

- [x] create migration in [migrations](https://github.com/jscodegeek/msj-classroom-api-app/blob/master/src/migrations) folder using sequelize-cli `sequelize migration:generate --name YOUR_MIGRATION_NAME` or you can apply your favourite approach, whatever it is.

***

### HOW TO add seeder:

- [x] create seeder in [seeders](https://github.com/jscodegeek/msj-classroom-api-app/blob/master/src/seeders) folder using sequelize-cli `sequelize seed:generate --name YOUR_SEEDER_NAME` or you can apply your favourite approach, whatever it is.

## PS:

In case something went wrong(that is unlikely to happen) I recommend to shut down server and run:
  1. sequelize db:migrate:undo:all
  2. sequelize db:migrate
  3. sequelize db:seed:all
