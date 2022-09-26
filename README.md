<!--
title: 'Serverless Star Wars API en NodeJS'
description: 'El presente proyecto integra las funciones de GET y POST de los endpoints de planetas y personas de Star Wars API.'
layout: Doc
framework: v3
platform: AWS
language: nodeJS
authorLink: 'https://github.com/GabrielMQ-5'
authorName: 'Gabriel MQ'
authorAvatar: 'https://avatars.githubusercontent.com/u/22775850?v=4'
-->

# Serverless Star Wars API en NodeJS

El presente proyecto integra las funciones de GET y POST de los endpoints de planetas y personas de Star Wars API.

## Configuración inicial

Ejecutar el script `createDBScript.sql` dentro de la carpeta `res` para generar el Schema y tablas necesarias para el sistema.

Crear un archivo `.env` en la carpeta raíz con el siguiente contenido:

```
# MySQL
DB_HOST=localhost
DB_NAME=sw_api
DB_USERNAME=(Usuario administrador)
DB_PASSWORD=(Contraseña del usuario)
```

## Uso

Ejecutar el comando 'serverless offline' para inicializar el sistema de manera local.

## Endpoints

Los endpoints incluidos son los siguientes:

```
GET  | http://localhost:3000/testConnection
GET  | http://localhost:3000/getPersona
POST | http://localhost:3000/postPersona
GET  | http://localhost:3000/getPlaneta
POST | http://localhost:3000/postPlaneta
```

# GET testConnection:

Un endpoint adicional de imprime en consola las funciones de tipo heartbeat de los módulos util y class utilizados en el sistema.

# GET getPersona:

Un endpoint que retorna la información de una persona registrada en el sistema a partir de su nombre.
Para utilizar el endpoint se debe enviar el parámetro `nombre`.

```
http://localhost:3000/getPersona?nombre=Luke Skywalker

o

http://localhost:3000/getPersona?nombre=Luke
```

Es posible realizar consultas con un segmento del nombre completo.
El sistema primero realizará una consulta en la base de datos para encontrar la persona previamente registrada bajo el nombre ingresado.
En caso no encuentre un resultado, realizará una petición a Star Wars API y procesará la información para retornarla con el formato interno del sistema.
La información retornada puede ser utilizada para registrar la persona en la base de datos mediante el endpoint `postPersona`.

# POST postPersona:

Un endpoint que registra la información de una persona utilizando el siguiento formato:

```
{
    "nombre": "Nombre completo",
    "anno_nacimiento": "Año en el formato de Star Wars",
    "genero": "Género de la persona",
    "color_ojos": "Color de ojos según aplique",
    "color_pelo": "Color de pelo según aplique",
    "color_piel": "Color de piel según aplique",
    "estatura": "Estatura en centímetros",
    "peso": "Peso en kilogramos"
}
```

El sistema retornará un mensaje de confirmación junto con la información de la persona registrada en la base de datos.

# GET getPlaneta:

Un endpoint que retorna la información de un planeta registrado en el sistema a partir de su nombre.
Para utilizar el endpoint se debe enviar el parámetro `nombre`.

```
http://localhost:3000/getPlaneta?nombre=Tatooine

o

http://localhost:3000/getPlaneta?nombre=Tatoo
```

Es posible realizar consultas con un segmento del nombre completo.
El sistema primero realizará una consulta en la base de datos para encontrar el planeta previamente registrado bajo el nombre ingresado.
En caso no encuentre un resultado, realizará una petición a Star Wars API y procesará la información para retornarla con el formato interno del sistema.
La información retornada puede ser utilizada para registrar el planeta en la base de datos mediante el endpoint `postPlaneta`.

# POST postPlaneta:

Un endpoint que registra la información de un planeta utilizando el siguiento formato:

```
{
    "nombre": "Nombre completo",
    "diametro": "Diámetro en kilómetros",
    "periodo_rotacion": "Número de horas que el planeta demora en rotar en su eje",
    "periodo_orbital": "Número de días que el planeta demora en orbitar su estrella",
    "gravedad": "Valor denotando el valor numérico de gravedad y si es estándar, doble o mitad de la gravedad estándar",
    "poblacion": "Población promedio de criaturas inteligentes en el planeta",
    "clima": "Clima del planeta, pueden ser múltiples",
    "terreno": "El tipo de terreno del planeta, pueden ser múltiples",
    "agua_superficial": "Porcentaje de la superficie del planeta que es agua"
}
```

El sistema retornará un mensaje de confirmación junto con la información del planeta registrado en la base de datos.
