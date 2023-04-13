# stage1 as builder
FROM node as builder

# copy the package.json to install dependencies
COPY package.json ./

# Install the dependencies and make the folder
RUN yarn install && mkdir /app && mv ./node_modules ./app

WORKDIR /app

COPY . .

# Build the project and copy the files
RUN yarn build


FROM nginx

#!/bin/sh

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 3000 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]