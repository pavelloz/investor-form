FROM node:16-alpine

WORKDIR /frontend
COPY ./package*.json .
RUN npm ci
COPY . .
RUN chown -R node:node /frontend
USER node

EXPOSE 3000
CMD npm start
