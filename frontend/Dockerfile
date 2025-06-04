FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ARG FRONTEND_BACKEND_URL
ARG FRONTEND_CLERK_API_KEY

RUN sed -i "s|__BACKEND_URL__|${FRONTEND_BACKEND_URL}|g" src/environments/environment.prod.ts && \
    sed -i "s|__CLERK_API_KEY__|${FRONTEND_CLERK_API_KEY}|g" src/environments/environment.prod.ts

RUN npm run build -- --configuration=production


FROM nginx:stable-alpine

COPY --from=builder /app/dist/archgen-front/browser /usr/share/nginx/html


EXPOSE 80
