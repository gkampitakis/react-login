FROM node:14.3.0-alpine3.10 as build

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN apk upgrade --update-cache --available && \
    apk add openssl && \
    rm -rf /var/cache/apk/*

RUN npm run tsc && npm run keygen && npm prune --production

FROM node:14.3.0-alpine3.10

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json /app/.env.prod ./

CMD ["npm","run","start:prod"]