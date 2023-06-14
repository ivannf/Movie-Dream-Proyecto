# Establece la imagen base
FROM node:latest as builder

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

#  Instala globalmente la interfaz de línea de comandos (CLI) de Angular en el contenedor.
RUN npm install -g @angular/cli@13

# Copia los archivos package.json desde el directorio local al directorio de trabajo en el contenedor.
COPY package.json package-lock.json ./

# Instala las dependencias especificadas en el archivo package.json
RUN npm ci

# Copia todos los archivos y carpetas del directorio local al directorio de trabajo en el contenedor.
COPY . .

# Establece el comando predeterminado que se ejecutará cuando el contenedor se inicie
# ng serve de Angular para iniciar el servidor de Angular y --host 0.0.0.0 para que el servidor
# esté disponible en todas las interfaces de red
CMD ["ng", "serve", "--host", "0.0.0.0"]