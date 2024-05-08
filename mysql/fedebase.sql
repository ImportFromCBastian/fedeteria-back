-- MySQL Script generated by MySQL Workbench
-- Wed May  8 11:14:06 2024
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema fedeteria-db
-- -----------------------------------------------------
-- fedeteria database

-- -----------------------------------------------------
-- Schema fedeteria-db
--
-- fedeteria database
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `fedeteria-db` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin ;
USE `fedeteria-db` ;

-- -----------------------------------------------------
-- Table `fedeteria-db`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fedeteria-db`.`Usuario` (
  `DNI` BIGINT NOT NULL,
  `nombre` VARCHAR(20) NOT NULL,
  `apellido` VARCHAR(20) NOT NULL,
  `contra` VARCHAR(60) NOT NULL,
  `mail` VARCHAR(50) NOT NULL,
  `recibeAnuncio` VARCHAR(2) NULL DEFAULT 'no',
  `fechaNacimiento` DATE NOT NULL,
  PRIMARY KEY (`DNI`),
  UNIQUE INDEX `DNI_UNIQUE` (`DNI` ASC) VISIBLE,
  UNIQUE INDEX `mail_UNIQUE` (`mail` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fedeteria-db`.`Cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fedeteria-db`.`Cliente` (
  `DNI` BIGINT NOT NULL,
  PRIMARY KEY (`DNI`),
  UNIQUE INDEX `idCliente_UNIQUE` (`DNI` ASC) INVISIBLE,
  CONSTRAINT `Cliente_DNI_FK`
    FOREIGN KEY (`DNI`)
    REFERENCES `fedeteria-db`.`Usuario` (`DNI`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fedeteria-db`.`Empleado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fedeteria-db`.`Empleado` (
  `DNI` BIGINT NOT NULL,
  PRIMARY KEY (`DNI`),
  UNIQUE INDEX `idEmpleado_UNIQUE` (`DNI` ASC) INVISIBLE,
  CONSTRAINT `Empleado_DNI_FK`
    FOREIGN KEY (`DNI`)
    REFERENCES `fedeteria-db`.`Usuario` (`DNI`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fedeteria-db`.`Admin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fedeteria-db`.`Admin` (
  `DNI` BIGINT NOT NULL,
  PRIMARY KEY (`DNI`),
  UNIQUE INDEX `DNI_UNIQUE` (`DNI` ASC) VISIBLE,
  CONSTRAINT `Admin_DNI_FK`
    FOREIGN KEY (`DNI`)
    REFERENCES `fedeteria-db`.`Usuario` (`DNI`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fedeteria-db`.`Publicacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fedeteria-db`.`Publicacion` (
  `idPublicacion` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `DNI` BIGINT NOT NULL,
  `nombre` VARCHAR(50) NULL,
  `precio` FLOAT UNSIGNED NULL DEFAULT 0,
  `descripcion` VARCHAR(255) NULL,
  `destacada` VARCHAR(2) NULL DEFAULT 'no',
  `productoACambio` VARCHAR(255) NULL,
  PRIMARY KEY (`idPublicacion`),
  UNIQUE INDEX `id_UNIQUE` (`idPublicacion` ASC) VISIBLE,
  INDEX `DNI_idx` (`DNI` ASC) VISIBLE,
  CONSTRAINT `Publicacion_DNI_FK`
    FOREIGN KEY (`DNI`)
    REFERENCES `fedeteria-db`.`Cliente` (`DNI`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fedeteria-db`.`Local`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fedeteria-db`.`Local` (
  `idLocal` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(60) NULL,
  `calle` VARCHAR(60) NULL,
  `numero` VARCHAR(10) NULL,
  `piso` VARCHAR(20) NULL DEFAULT NULL,
  `depto` VARCHAR(20) NULL DEFAULT NULL,
  `DNI` BIGINT NOT NULL,
  PRIMARY KEY (`idLocal`),
  UNIQUE INDEX `idLocal_UNIQUE` (`idLocal` ASC) VISIBLE,
  INDEX `DNI_idx` (`DNI` ASC) VISIBLE,
  CONSTRAINT `Local_DNI_FK`
    FOREIGN KEY (`DNI`)
    REFERENCES `fedeteria-db`.`Empleado` (`DNI`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
