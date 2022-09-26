const persona = require("../classes/persona.class");
const planeta = require("../classes/planeta.class");

module.exports.validatorCheck = () => {
  console.log("Validator module check.");
};

module.exports.validatePersonFields = (personData) => {
  return !personData.nombre ||
    !personData.anno_nacimiento ||
    !personData.genero ||
    !personData.color_ojos ||
    !personData.color_pelo ||
    !personData.color_piel ||
    !personData.estatura ||
    !personData.peso
    ? null
    : persona.fromObject(personData);
};

module.exports.validatePlanetFields = (planetData) => {
  return !planetData.nombre ||
    !planetData.diametro ||
    !planetData.periodo_rotacion ||
    !planetData.periodo_orbital ||
    !planetData.gravedad ||
    !planetData.poblacion ||
    !planetData.clima ||
    !planetData.terreno ||
    !planetData.agua_superficial
    ? null
    : planeta.fromObject(planetData);
};
