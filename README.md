<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Repositorio de ejemplo

El siguiente repositorio muestra el cascarón inicial para una API REST con conexión a MongoDB a través de SSL.

En caso de requerirlo se puede hacer un fork del repositorio para futuros proyectos.

## Instalación

```bash
$ yarn
```

## Ejecutar la aplicación

```bash
# modo de desarrollo
$ yarn run start:dev

# modo de producción
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Anotaciones

El proyecto ha sido creado con el gestor de paquetes yarn, por lo cual es necesario tenerlo instalado.

El proyecto cuenta con tres archivos .env:

- **.env.development** Contiene las variables de entorno en ambiente de desarrollo y debe ser creado d forma manual en la raíz del proyecto.

- **.env.production** Contiene las variables de entorno en ambiente de producción y debe ser creado d forma manual en la raíz del proyecto.

- **.env.sample** Contiene la estructura de los archivos de entorno y puede ser copiado para crear los archivos de entorno de desarrollo y producción.

En el archivo constants.config.ts se escribirán las constantes que harán referencia al nombre de las variables de entorno de la aplicación. Se hará uso de estas constantes a lo largo del proyecto, evitando el uso de process.env para permitir la flexibilidad y parametrización de variables de entorno.

Dentro de la carpeta common se colocarán archivos que contengan funciones generales que puedan ser compartidas por varios módulos de la aplicación o fragmentos de código que puedan ser reutilizables.

La carpeta certs que se encuentra en la raíz de la aplicación contendrá los archivos .pem correspondientes a los certificados SSL para la conexión a la base de datos.
