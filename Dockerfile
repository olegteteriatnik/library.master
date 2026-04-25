FROM node:20

RUN apt-get update && apt-get install -y git

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run test:unit
RUN npm run build

ENV NODE_ENV=production

CMD ["npm", "start"]
