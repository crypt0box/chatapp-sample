# STAGE-0 build client
FROM node:16-slim AS client

WORKDIR /usr/src/app

COPY ./client/package*.json ./

RUN npm install

COPY ./client ./

RUN npm run build

# STAGE-1 build server
FROM node:16.14.2

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY ./src ./src
COPY tsconfig.json ./

RUN npm run build

COPY --from=client /usr/src/app/dist ./client/dist

EXPOSE 7777
CMD ["node", "dist/main.js"]
