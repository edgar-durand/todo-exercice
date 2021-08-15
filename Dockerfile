FROM node:14.17-alpine AS builder
ENV NODE_ENV=production

WORKDIR /app
COPY ["package*.json","./"]
RUN npm i
COPY . .

RUN npm i -g @angular/cli
RUN ng build

FROM nginx:1.19
COPY --from=builder /app/dist/todo-exercise/ /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
