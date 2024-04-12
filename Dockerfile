FROM node:20-alpine3.17

WORKDIR /app

COPY package*.json .

RUN npm i 

COPY . .

RUN npm run build
RUN npx prisma generate


EXPOSE 9000
CMD ["node", "dist/src/main"]