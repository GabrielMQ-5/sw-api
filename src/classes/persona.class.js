module.exports.Persona = class {
  constructor(
    nombre,
    anno_nacimiento,
    genero,
    color_ojos,
    color_pelo,
    color_piel,
    estatura,
    peso
  ) {
    this.nombre = nombre;
    this.anno_nacimiento = anno_nacimiento;
    this.genero = genero;
    this.color_ojos = color_ojos;
    this.color_pelo = color_pelo;
    this.color_piel = color_piel;
    this.estatura = estatura;
    this.peso = peso;
  }
};

module.exports.fromObject = (personObj) => {
  return new this.Persona(
    personObj.nombre,
    personObj.anno_nacimiento,
    personObj.genero,
    personObj.color_ojos,
    personObj.color_pelo,
    personObj.color_piel,
    personObj.estatura,
    personObj.peso
  );
};

module.exports.personaCheck = () => {
  console.log("Persona module check.");
};
