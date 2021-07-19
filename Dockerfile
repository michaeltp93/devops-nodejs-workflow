FROM node:16
WORKDIR /app
COPY package.json .
RUN yarn install

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install; \
    else npm install --only=production; \
    fi

COPY . .
ENV PORT 3200
EXPOSE $PORT
CMD ["node", "src/index.js"]