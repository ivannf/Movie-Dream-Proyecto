# Establece la imagen base
FROM node:latest

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

COPY package*.json ./

# Compila la aplicación Node
RUN npm install

# Copia los archivos necesarios del proyecto al contenedor
COPY . .

# Expone el puerto necesario para acceder a la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación cuando se ejecute el contenedor
CMD ["npm", "start"]