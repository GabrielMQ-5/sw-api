--------------------------------------------------------
-- Create MySQL Schema for system
--------------------------------------------------------

--------------------------------------------------------
-- Schema sw_api
--------------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `sw_api`;
USE `sw_api` ;

--------------------------------------------------------
-- Table `sw_api`.`persona`
--------------------------------------------------------
CREATE TABLE IF NOT EXISTS `sw_api`.`persona` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `anno_nacimiento` VARCHAR(45) NULL DEFAULT NULL,
  `color_ojos` VARCHAR(45) NULL DEFAULT NULL,
  `genero` VARCHAR(45) NULL DEFAULT NULL,
  `color_pelo` VARCHAR(45) NULL DEFAULT NULL,
  `estatura` INT(11) NULL DEFAULT NULL,
  `peso` INT(11) NULL DEFAULT NULL,
  `color_piel` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`));

--------------------------------------------------------
-- Table `sw_api`.`planeta`
--------------------------------------------------------
CREATE TABLE IF NOT EXISTS `sw_api`.`planeta` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `diametro` INT(11) NULL DEFAULT NULL,
  `periodo_rotacion` INT(11) NULL DEFAULT NULL,
  `periodo_orbital` INT(11) NULL DEFAULT NULL,
  `gravedad` VARCHAR(45) NULL DEFAULT NULL,
  `poblacion` INT(11) NULL DEFAULT NULL,
  `clima` VARCHAR(45) NULL DEFAULT NULL,
  `terreno` VARCHAR(45) NULL DEFAULT NULL,
  `agua_superficial` DECIMAL(2,0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`));