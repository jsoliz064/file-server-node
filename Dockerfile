FROM node:18-slim

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

# Establecer el comando para iniciar la aplicación
CMD ["npm","start"]
