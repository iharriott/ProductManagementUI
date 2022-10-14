FROM node:16.15.1 as builder 
COPY . /app
WORKDIR /app
RUN npm install
RUN npm run build

FROM nginx:1.17.10-alpine
EXPOSE 80
COPY --from=builder /app/dist/product-definition /usr/share/nginx/html