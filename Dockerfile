FROM node:20

RUN mkdir /home/node/app

WORKDIR /home/node/app

COPY . /home/node/app

RUN npm install

RUN npm install -g @nestjs/cli

RUN npm run build

CMD ["node", "dist/main"]


EXPOSE 3000
