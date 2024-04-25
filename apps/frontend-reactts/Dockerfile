FROM node:18.20-alpine
WORKDIR /app-frontend
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
EXPOSE 4173
ENTRYPOINT [ "npm" ]
CMD [ "run", "preview" ]