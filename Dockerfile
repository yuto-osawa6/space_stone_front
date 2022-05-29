FROM node:16-alpine3.14
WORKDIR /usr/src/app

COPY ./app /usr/src/app
# COPY ./app/env.local /usr/src/app/.env.local
RUN yarn install && yarn build
EXPOSE 3000

CMD ["yarn", "start"]