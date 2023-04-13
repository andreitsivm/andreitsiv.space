
FROM node as builder
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
COPY ./ ./
RUN yarn install

# Build the project and copy the files
RUN yarn workspace client build