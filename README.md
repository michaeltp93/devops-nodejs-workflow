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
