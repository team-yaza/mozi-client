FROM node:16-alpine

WORKDIR /usr/src/mozi

COPY *.* /usr/src/mozi/

RUN yarn install

COPY . /usr/src/mozi

RUN yarn build

CMD [ "yarn", "start" ]