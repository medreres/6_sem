FROM node:18.12.0-slim as development

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY src ./app/src
COPY tsconfig*.json ./

EXPOSE 3000

CMD ["npm", "run", "dev"]

FROM node:18.12.0-slim as builder

WORKDIR /app

COPY package*.json  ./
# install dependencies
RUN npm ci

COPY . .
# build
RUN npm run build


FROM node:18.12.0-slim as production

WORKDIR /app

# copy from build image
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next

EXPOSE 3000

CMD ["npm", "start"]