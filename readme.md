# MSJ-CLASSROOM-API

REST API for msj-classroom-apps.

## Requirements

latest stable version of [Node.js](https://nodejs.org/).

latest stable version of [PostgreSQL](https://www.postgresql.org/)

project uses [sequelize-cli](https://github.com/sequelize/cli) in order to apply migrations and seeders to database

latest version of [npx](https://www.npmjs.com/package/npx) installed with -g flag

for performing http requests(prepared in advance) to server for testing purposes You should install [Insomnia](https://insomnia.rest/) and import [Insomnia config file](https://github.com/jscodegeek/msj-classroom-api-app/tree/master/Insomnia_msj-classroom-api-app.json).

## Getting Started

Application requires next actions to be done before using it:

1. Create PostgreSQL database according to **db options** of [development config file](https://github.com/jscodegeek/msj-classroom-api-app/tree/master/src/config/development.ts)

2. Clone repository `git clone git@github.com:jscodegeek/msj-classroom-api-app.git`

3. In order to install required dependencies run `npm i` or `yarn install`

4. In order to **bootstrap PostgreSQL database** follow next instructions:

   - [x] run `npm run db:migrate:up`
   - [x] run `npm run db:seed`

---

## Contributing:

### PUSH PREPARATION

- [x] run `npm run build`
- [x] run `npm run lint:fix`

---

### Changing db configs:

- [x] change config in [sequelize-cli.config.js](https://github.com/jscodegeek/msj-classroom-api-app/tree/master/db/config/sequelize-cli.config.js) file
- [x] change config in [src/config](https://github.com/jscodegeek/msj-classroom-api-app/tree/master/src/config) folder.

**NOTE:** It is important to keep them in sync!

---

### HOW TO add endpoint:

- [x] create route in [routes](https://github.com/jscodegeek/msj-classroom-api-app/tree/master/src/routes) folder. **handler creation described several steps below**
- [x] in case you create new file(for routes) you should add it to [index](https://github.com/jscodegeek/msj-classroom-api-app/tree/master/src/routes/index.ts)
- [x] create handler for route in [controllers](https://github.com/jscodegeek/msj-classroom-api-app/tree/master/src/controllers) folder
- [x] in case you create new file(for handlers) you should add it to [index](https://github.com/jscodegeek/msj-classroom-api-app/tree/master/src/controllers/index.ts)

---

### HOW TO add model:

- [x] create model in [models](https://github.com/jscodegeek/msj-classroom-api-app/tree/master/src/models) folder using sequelize-cli `npx sequelize model:generate --name YOUR_MODEL_NAME --attributes columnName:columnType` or you can apply your favourite approach, whatever it is.
- [x] in case you create new file(model) you should add it to [index](https://github.com/jscodegeek/msj-classroom-api-app/tree/master/src/models/index.ts) **models object** which will be exported.

**NOTE:** In case you create model or change its schema you should **create migration**. That is described in [migrations section](https://github.com/jscodegeek/msj-classroom-api-app#how-to-add-migration)

---

### HOW TO add migration:

- [x] create migration in [migrations](https://github.com/jscodegeek/msj-classroom-api-app/tree/master/db/migrations) folder using sequelize-cli `npx sequelize migration:generate --name YOUR_MIGRATION_NAME --attributes columnName:columnType` or you can apply your favourite approach, whatever it is.

---

### HOW TO add seeder:

- [x] create seeder in [seeders](https://github.com/jscodegeek/msj-classroom-api-app/tree/master/db/seeders) folder using sequelize-cli `npx sequelize seed:generate --name YOUR_SEEDER_NAME --attributes columnName:columnType` or you can apply your favourite approach, whatever it is.

## PS:

In case something went wrong(that is unlikely to happen) I recommend to shut down server and run:

- [x] `npm run db:migrate:down`
- [x] `npm run db:migrate:up`
- [x] `npm run db:seed`
