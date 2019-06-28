FROM node:alpine
COPY /app/package.json /
RUN npm install
COPY /app /
CMD npm run clean
CMD npm run build-ts
CMD node dist/server.js
EXPOSE 3000