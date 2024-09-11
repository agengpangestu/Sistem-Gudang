# Build Stage
FROM node:20.4-alpine AS build

WORKDIR /app

COPY package*.json .

# RUN npm install

RUN npm install -g nodemon typescript

# RUN npm install @prisma/client uuid bcrypt cors dotenv express joi jsonwebtoken moment nodemon pino pino-pretty

# RUN npm install -D typescript prisma @types/uuid @types/bcrypt @types/cors @types/dotenv @types/express @types/jest @types/jsonwebtoken @types/node @types/supertest @types/uuid jest prisma supertest ts-node

RUN npm run build

RUN npx prisma init
RUN npx prisma migrate dev
RUN npx prisma generate

COPY . .

EXPOSE 4000

CMD [ "npm", "run", "dev" ]

RUN npm run build

# Production Stage
# FROM node:20.4-alpine AS production

# WORKDIR /app

# COPY package*.json .app

# RUN npm ci --only=production

# COPY --from=build /app/build ./build

# CMD [ "nodemon" ]