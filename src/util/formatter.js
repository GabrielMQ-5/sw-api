const persona = require("../classes/persona.class");
const planeta = require("../classes/planeta.class");

module.exports.formatterCheck = () => {
  console.log("Formatter module check.");
};

module.exports.formatPersonFromAPI = (personResult) => {
  return new persona.Persona(
    personResult.name,
    personResult.birth_year,
    personResult.gender,
    personResult.eye_color,
    personResult.hair_color,
    personResult.skin_color,
    personResult.height,
    personResult.mass
  );
};

module.exports.formatPlanetFromAPI = (planetResult) => {
  return new planeta.Planeta(
    planetResult.name,
    planetResult.diameter,
    planetResult.rotation_period,
    planetResult.orbital_period,
    planetResult.gravity,
    planetResult.population,
    planetResult.climate,
    planetResult.terrain,
    planetResult.surface_water
  );
};
