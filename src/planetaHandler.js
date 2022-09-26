"use strict";

const formatter = require("./util/formatter");
const validator = require("./util/validator");
const planetaClass = require("./classes/planeta.class");

const axios = require("axios");
const mysql = require("serverless-mysql")();
mysql.config({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

//#region GET
module.exports.getPlaneta = async (event) => {
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
      "SELECT * FROM planeta WHERE nombre LIKE ?",
      [name]
    );
    await mysql.end();
    if (results.length > 0) {
      let planeta = planetaClass.fromObject(results[0]);
      return {
        statusCode: 200,
        body: JSON.stringify(planeta, null, 2),
      };
    }
    const apiUrl = "https://swapi.py4e.com/api/planets/?search=" + name;
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

    let formattedPlanet = formatter.formatPlanetFromAPI(
      response.data.results[0]
    );

    return {
      statusCode: 200,
      body: JSON.stringify(formattedPlanet, null, 2),
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
module.exports.postPlaneta = async (event) => {
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
  let validPlanet = validator.validatePlanetFields(JSON.parse(body));
  if (!validPlanet)
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
      .query("INSERT INTO planeta SET ?", validPlanet)
      .query((r) => ["SELECT * FROM  planeta WHERE id = ?", r.insertId])
      .rollback((e) => {
        throw e;
      })
      .commit();

    return {
      statusCode: 201,
      body: JSON.stringify(
        {
          message: "Planeta registrado.",
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
