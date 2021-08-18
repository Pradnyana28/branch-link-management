FROM node:alpine

WORKDIR /bonsai/link

COPY package.json .

RUN npm i

COPY . .

RUN npm run build
RUN npm prune --production

EXPOSE 3020

CMD ["node", "dist/main"]