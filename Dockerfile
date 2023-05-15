# ==== CONFIGURE =====
FROM node:current-alpine

WORKDIR /app

COPY . .

# ==== BUILD =====
RUN npm ci

RUN npm run build

# ==== RUN =======
ENV NODE_ENV production
ENV REACT_APP_GOOGLE_APP_ID=${REACT_APP_GOOGLE_APP_ID}
ENV REACT_APP_GOOGLE_API_KEY=${REACT_APP_GOOGLE_API_KEY}
ENV REACT_APP_SERVER_BASE_URL=${REACT_APP_SERVER_BASE_URL}

EXPOSE 3000

CMD [ "npx", "serve", "build" ]
