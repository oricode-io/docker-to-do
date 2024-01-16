FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080

ENV MONGODB_USERNAME=admin
ENV MONGDB_PASSWORD=secret

CMD ["npm", "start"]
