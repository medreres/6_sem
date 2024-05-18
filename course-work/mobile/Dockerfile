FROM node:18.12.0-slim as development

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY src ./app/src
COPY tsconfig*.json ./

EXPOSE 19000

CMD ["npm", "run", "start"]