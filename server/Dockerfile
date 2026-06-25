FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ENV NODE_OPTIONS=--max-old-space-size=2048

RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]