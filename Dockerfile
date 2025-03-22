FROM node:20

WORKDIR /app

COPY package.json .
COPY .npmrc .

RUN npm i
COPY . .

ENV NODE_ENV=production

RUN npm run test:unit
RUN npm run build
CMD ["npm", "start"]
