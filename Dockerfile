FROM alpine as env
COPY /root/env/.env.local /env/.env.local

FROM node:latest

WORKDIR /app

COPY . .

COPY --from=env /env/.env.local ./.env.local

RUN npm ci

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]