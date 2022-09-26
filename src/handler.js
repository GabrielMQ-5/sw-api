"use strict";

const formatter = require("./util/formatter");
const validator = require("./util/validator");
const persona = require("./classes/persona.class");
const planeta = require("./classes/planeta.class");

const mysql = require("serverless-mysql")();
mysql.config({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

module.exports.testConnection = async (event) => {
  formatter.formatterCheck();
  validator.validatorCheck();
  persona.personaCheck();
  planeta.planetaCheck();

  await mysql.connect();
  await mysql.end();
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "DB, Utils & Classes Check.",
      },
      null,
      2
    ),
  };
};
