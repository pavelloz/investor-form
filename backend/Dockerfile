FROM node:16-alpine

WORKDIR /backend
COPY ./package*.json .
RUN npm ci
COPY . .
RUN chown -R node:node /backend
USER node

EXPOSE 3001

CMD npm run dev
