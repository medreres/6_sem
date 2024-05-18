# Description

Server for weather prediction. Supports authentication, saving weather cards and searching cities

# Stack

- Nest
- Prisma
- Redis
- GraphQL
- JWT Tokens

# Run the app

```
docker-compose build
npm run start:dev:docker
npm run dev:initialize
```

`docker-compose build` to build image
`npm run start:dev:docker` to run containers
`npm run dev:initialize` to migrate db and seed testing

And you are good to go!

You can sign in with such credentials
email
`admin@admin.com`
password
`admin`
