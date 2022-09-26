module.exports.Planeta = class {
  constructor(
    nombre,
    diametro,
    periodo_rotacion,
    periodo_orbital,
    gravedad,
    poblacion,
    clima,
    terreno,
    agua_superficial
  ) {
    this.nombre = nombre;
    this.diametro = diametro;
    this.periodo_rotacion = periodo_rotacion;
    this.periodo_orbital = periodo_orbital;
    this.gravedad = gravedad;
    this.poblacion = poblacion;
    this.clima = clima;
    this.terreno = terreno;
    this.agua_superficial = agua_superficial;
  }
};

module.exports.fromObject = (planetObj) => {
  return new this.Planeta(
    planetObj.nombre,
    planetObj.diametro,
    planetObj.periodo_rotacion,
    planetObj.periodo_orbital,
    planetObj.gravedad,
    planetObj.poblacion,
    planetObj.clima,
    planetObj.terreno,
    planetObj.agua_superficial
  );
};

module.exports.planetaCheck = () => {
  console.log("Planeta module check.");
};
