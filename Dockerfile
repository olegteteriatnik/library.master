FROM node:20

RUN apt-get update && apt-get install -y git

WORKDIR /app

COPY package.json .
COPY .npmrc .

RUN npm i
COPY . .

ENV NODE_ENV=production

RUN npm run test:unit
RUN npm run build
CMD ["npm", "start"]
