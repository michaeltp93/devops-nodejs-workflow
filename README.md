## Crear una imagen personalizada con Dockerfile

```bash
# crear imagen
docker build -t app-nodejs-image .

# Crear un contenedor y ejecutarlo
docker run -d --name node-app app-nodejs-image

# Ejecutar bash en el contenedor
docker exec -it node-app bash
```

## Más eficiente trabajar con Docker-componse

```bash
# contruir y crear un contenedor a traves de docker-composer
docker-compose up -d --build

# crear solo un contenedor a traves de docker-composer
docker-compose up -d

# destruir los contenedores que estan corriendo
docker-compose down -v

# Ejecutar vario archivos docker-compose (development)
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build

# Ejecutar vario archivos docker-compose (production)
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

## Más comandos de ayuda

```bash
# Más info sobre un contenedor determinado
docker inspect <nombre container>

# ver actividad del container
docker logs <nombre del container>

# ver las networks que tenemos
docker network ls
```

## En Producción

Hay que conseguir un servicios de hosting donde subir nuestro backend. Suele elegirse un servicio donde se trabaje con linux.
Una vez elegido y configurado, podemos conectarnos remotamente al servidor.

```bash
# desde consola
ssh root@<ip address>
```

- Lo primero que tenemos que hacer es installar docker

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
```

- Luego, tenemos que instalar docker-compose.

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# cambiar los permisos
sudo chmod +x /usr/local/bin/docker-compose
```

**Nota:** En producción, tenemos que tener cuidado de no compartir nuestras contraseñas.

- Una vez cambiadas nuestras variables de entorno, continuamos en nuestro servidor linux.

```bash
# crear variables de entorno en nuestro servidor (manera manual)
export SESSION_SECRET=<variable de entorno>

# mostrart variables de entorno
printenv
```

- Lo más común es crear un archivo .env en el servidor `vim .env`

- Luego, tenemos que editar el archivo **.profile**

```vim
set -o allexport; source /root/.env; set +o allexport
```

#### Importante clonar el repositorio de github de nuestro proyecto en nuestro servidor. En mi caso:

```bash
# crear direactorio app
mkdir app
cd app

# clonar repositorio
git clone https://github.com/michaeltp93/devops-nodejs-workflow

# build nuestro docker container (en mi caso, utilizo script con yarn)
yarn docker-prod:build

# o
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```
