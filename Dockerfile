
FROM node as builder
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
COPY ./ ./
RUN yarn install

# Build the project and copy the files
RUN yarn workspace client build
FROM nginx
#!/bin/sh
COPY ./.nginx/nginx.conf /etc/nginx/conf.d/default.conf
## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*
# Copy from the stahg 1
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 3000 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]