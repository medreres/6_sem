# Text part
[Click](https://docs.google.com/document/d/1I7MIvjBsWfOs0q-xuF9awrnFjKNt8Qln-m7XNfIpFdM/edit#heading=h.35qipulhb4oj)

# Video part
[Click](https://www.loom.com/share/19e607a647aa4a28bb0b20bae92f13e9)

# Description

Weather app, that allows you to search for forecasts and add them into following.
Stack

- Typescript
- Next
- Nest
- PostgreSQL
- Redis
- GraphQL
- Docker

# Getting started

## Env files

- Create .env.development file in server folder, you have .env.example provided
- Create .env.development file in client folder, you have .env.example provided

## Initialize pre-commit hooks

To enforce running test, prettier and linter before each commit,
install husky to set up git pre-commit hook

```
npm i
npx husky install
```

### Important!

**After installing hooks, make sure to install all dependencies both in client and server folders,
as hooks required tests to pass.**

To skip precommit hook, add flag `--no-verify`
`git commit -m <message> --no-verify`

Now before each commit, hook will run tests and, if they succeed, add the commit.

## Running

To run the app just type

`docker compose -f docker-compose.yml --env-file=./server/.env.development up`

You can add -d flag to run in background

If this is the first time starting the app, you should run migration also
<sup>
**Bear in mind!**
You may not use any server endpoints without running migrations, as it will lead to errors when migrate will happen, but seed won't. So immediately after spinning up the server, run the migrations
</sup>

`docker exec -t server npm run db:dev:initialize && docker exec -t server npm run db:dev:seed`

# Usage

To get started you need to sign in or sign up,
in case you have run `npm run dev:initialize`, you can log in with credentials
email: `admin@admin.com`
password: `admin@admin.com`

# Production build

Create .env.production in both client and server directories run

**Keep in mind that migrations should have been run before starting app**

`docker compose -f docker-compose.prod.yml --env-file=./server/.env.production build`
`docker compose -f docker-compose.prod.yml --env-file=./server/.env.production up`
