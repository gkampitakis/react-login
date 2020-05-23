FROM node:14.3.0-alpine3.10 as build

WORKDIR /app

COPY package.json .

RUN npm install

COPY . . 

RUN npm run build

FROM node:14.3.0-alpine3.10

RUN npm i -g serve

WORKDIR /app

COPY --from=build /app/build .

EXPOSE 3000

CMD ["serve", "-p", "3000", "-s", "."]