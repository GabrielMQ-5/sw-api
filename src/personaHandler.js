"use strict";

const formatter = require("./util/formatter");
const validator = require("./util/validator");
const personaClass = require("./classes/persona.class");

const axios = require("axios");
const mysql = require("serverless-mysql")();
mysql.config({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

//#region GET
module.exports.getPersona = async (event) => {
  let name = event.queryStringParameters
    ? event.queryStringParameters.nombre
    : null;
  if (!name)
    return {
      statusCode: 400,
      body: JSON.stringify(
        {
          message: "Parámetro de nombre no recibido.",
        },
        null,
        2
      ),
    };
  try {
    let results = await mysql.query(
      "SELECT * FROM persona WHERE nombre LIKE ?",
      [name]
    );
    await mysql.end();
    if (results.length > 0) {
      let persona = personaClass.fromObject(results[0]);
      return {
        statusCode: 200,
        body: JSON.stringify(persona, null, 2),
      };
    }
    const apiUrl = "https://swapi.py4e.com/api/people/?search=" + name;
    const response = await axios.get(apiUrl);

    if (
      !response ||
      !response.data ||
      !response.data.results ||
      response.data.count == 0
    ) {
      return {
        statusCode: 404,
        body: JSON.stringify(
          {
            message: "Nombre inválido.",
          },
          null,
          2
        ),
      };
    }

    let formattedPerson = formatter.formatPersonFromAPI(
      response.data.results[0]
    );

    return {
      statusCode: 200,
      body: JSON.stringify(formattedPerson, null, 2),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: "Error en la petición del servidor.",
        },
        null,
        2
      ),
    };
  }
};
//#endregion

//#region POST
module.exports.postPersona = async (event) => {
  let body = event.body;
  if (!body)
    return {
      statusCode: 400,
      body: JSON.stringify(
        {
          message: "Información no recibida.",
        },
        null,
        2
      ),
    };
  let validPerson = validator.validatePersonFields(JSON.parse(body));
  if (!validPerson)
    return {
      statusCode: 400,
      body: JSON.stringify(
        {
          message: "Campos no válidos.",
        },
        null,
        2
      ),
    };
  try {
    let result = await mysql
      .transaction()
      .query("INSERT INTO persona SET ?", validPerson)
      .query((r) => ["SELECT * FROM  persona WHERE id = ?", r.insertId])
      .rollback((e) => {
        throw e;
      })
      .commit();

    return {
      statusCode: 201,
      body: JSON.stringify(
        {
          message: "Persona registrada.",
          data: result[1],
        },
        null,
        2
      ),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: "DB insert error.",
        },
        null,
        2
      ),
    };
  }
};
//#endregion
