FROM node:12.22.0
WORKDIR ./api
COPY package.json /api
COPY yarn.lock /api
RUN yarn install
COPY . /api
# EXPOSE 3333
CMD node ./bin/www
