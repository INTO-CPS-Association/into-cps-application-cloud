FROM node:10
COPY /app/package.json /
RUN npm install
COPY /app /
RUN npm run build-ts
CMD node dist/server.js
EXPOSE 3000
