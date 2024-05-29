-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema fedeteria-db
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `fedeteria-db` ;

-- -----------------------------------------------------
-- Schema fedeteria-db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `fedeteria-db` ;
USE `fedeteria-db` ;

-- -----------------------------------------------------
-- Table `fedeteria-db`.`Usuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fedeteria-db`.`Usuario` ;

CREATE TABLE IF NOT EXISTS `fedeteria-db`.`Usuario` (
  `DNI` BIGINT NOT NULL,
  `nombre` VARCHAR(20) COLLATE 'utf8mb3_bin' NOT NULL,
  `apellido` VARCHAR(20) COLLATE 'utf8mb3_bin' NOT NULL,
  `contra` VARCHAR(60) COLLATE 'utf8mb3_bin' NOT NULL,
  `mail` VARCHAR(50) COLLATE 'utf8mb3_bin' NOT NULL,
  `recibeAnuncio` VARCHAR(2) COLLATE 'utf8mb3_bin' NULL DEFAULT 'no',
  `fechaNacimiento` DATE NOT NULL,
  `bloqueada` TINYINT UNSIGNED NULL DEFAULT 0,
  PRIMARY KEY (`DNI`),
  UNIQUE INDEX `DNI_UNIQUE` (`DNI` ASC) VISIBLE,
  UNIQUE INDEX `mail_UNIQUE` (`mail` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fedeteria-db`.`Local`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fedeteria-db`.`Local` ;

CREATE TABLE IF NOT EXISTS `fedeteria-db`.`Local` (
  `idLocal` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(60) NOT NULL,
  `calle` VARCHAR(60) COLLATE 'utf8mb3_bin' NOT NULL,
  `numero` VARCHAR(10) COLLATE 'utf8mb3_bin' NOT NULL,
  `piso` VARCHAR(20) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `depto` VARCHAR(20) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  PRIMARY KEY (`idLocal`),
  UNIQUE INDEX `idLocal_UNIQUE` (`idLocal` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fedeteria-db`.`Empleado`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fedeteria-db`.`Empleado` ;

CREATE TABLE IF NOT EXISTS `fedeteria-db`.`Empleado` (
  `DNI` BIGINT NOT NULL,
  `idLocal` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`DNI`),
  UNIQUE INDEX `idEmpleado_UNIQUE` (`DNI` ASC) INVISIBLE,
  INDEX `Empleado_Local_FK_idx` (`idLocal` ASC) VISIBLE,
  CONSTRAINT `Empleado_DNI_FK`
    FOREIGN KEY (`DNI`)
    REFERENCES `fedeteria-db`.`Usuario` (`DNI`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `Empleado_Local_FK`
    FOREIGN KEY (`idLocal`)
    REFERENCES `fedeteria-db`.`Local` (`idLocal`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fedeteria-db`.`Cliente`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fedeteria-db`.`Cliente` ;

CREATE TABLE IF NOT EXISTS `fedeteria-db`.`Cliente` (
  `DNI` BIGINT NOT NULL,
  `idLocal` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`DNI`),
  UNIQUE INDEX `DNI_UNIQUE` (`DNI` ASC) VISIBLE,
  INDEX `Cliente_Local_FK_idx` (`idLocal` ASC) VISIBLE,
  CONSTRAINT `Cliente_DNI_FK`
    FOREIGN KEY (`DNI`)
    REFERENCES `fedeteria-db`.`Usuario` (`DNI`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `Cliente_Local_FK`
    FOREIGN KEY (`idLocal`)
    REFERENCES `fedeteria-db`.`Local` (`idLocal`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fedeteria-db`.`Publicacion`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fedeteria-db`.`Publicacion` ;

CREATE TABLE IF NOT EXISTS `fedeteria-db`.`Publicacion` (
  `idPublicacion` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `DNI` BIGINT NOT NULL,
  `nombre` VARCHAR(50) NOT NULL,
  `precio` FLOAT UNSIGNED NOT NULL DEFAULT '0',
  `descripcion` VARCHAR(255) COLLATE 'utf8mb3_bin' NOT NULL,
  `destacada` VARCHAR(2) COLLATE 'utf8mb3_bin' NOT NULL DEFAULT 'no',
  `productoACambio` VARCHAR(255) COLLATE 'utf8mb3_bin' NULL,
  `estado` VARCHAR(5) NOT NULL,
  PRIMARY KEY (`idPublicacion`),
  UNIQUE INDEX `id_UNIQUE` (`idPublicacion` ASC) VISIBLE,
  INDEX `CLIENTE_PUB_FK_idx` (`DNI` ASC) VISIBLE,
  CONSTRAINT `CLIENTE_PUB_FK`
    FOREIGN KEY (`DNI`)
    REFERENCES `fedeteria-db`.`Cliente` (`DNI`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fedeteria-db`.`Foto`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fedeteria-db`.`Foto` ;

CREATE TABLE IF NOT EXISTS `fedeteria-db`.`Foto` (
  `idFoto` INT NOT NULL AUTO_INCREMENT,
  `foto` MEDIUMBLOB NULL DEFAULT NULL,
  `idPublicacion` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`idFoto`),
  UNIQUE INDEX `idFoto_UNIQUE` (`idFoto` ASC) VISIBLE,
  INDEX `idPublicacion_idx` (`idPublicacion` ASC) VISIBLE,
  CONSTRAINT `idPublicacion`
    FOREIGN KEY (`idPublicacion`)
    REFERENCES `fedeteria-db`.`Publicacion` (`idPublicacion`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fedeteria-db`.`Admin`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fedeteria-db`.`Admin` ;

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
-- Table `fedeteria-db`.`Trueque`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fedeteria-db`.`Trueque` ;

CREATE TABLE IF NOT EXISTS `fedeteria-db`.`Trueque` (
  `idTrueque` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `hora` TIME NULL,
  `fecha` DATE NULL,
  `realizado` TINYINT NULL DEFAULT NULL,
  `productoDeseado` INT UNSIGNED NOT NULL,
  `idLocal` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`idTrueque`),
  UNIQUE INDEX `idTrueque_UNIQUE` (`idTrueque` ASC) VISIBLE,
  INDEX `PUB_PRIN_TRUEQUE_FK_idx` (`productoDeseado` ASC) VISIBLE,
  INDEX `TRUEQUE_LOCAL_FK_idx` (`idLocal` ASC) VISIBLE,
  CONSTRAINT `PUB_PRIN_TRUEQUE_FK`
    FOREIGN KEY (`productoDeseado`)
    REFERENCES `fedeteria-db`.`Publicacion` (`idPublicacion`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `TRUEQUE_LOCAL_FK`
    FOREIGN KEY (`idLocal`)
    REFERENCES `fedeteria-db`.`Local` (`idLocal`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fedeteria-db`.`ProductosCambio`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fedeteria-db`.`ProductosCambio` ;

CREATE TABLE IF NOT EXISTS `fedeteria-db`.`ProductosCambio` (
  `idProductosCambio` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `idTrueque` INT UNSIGNED NOT NULL,
  `idPublicacion` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`idProductosCambio`),
  UNIQUE INDEX `idProductosCambio_UNIQUE` (`idProductosCambio` ASC) VISIBLE,
  INDEX `REL_TRUEQUE_PUB_idx` (`idTrueque` ASC) VISIBLE,
  INDEX `REL_PUB_TRUEQUE_idx` (`idPublicacion` ASC) VISIBLE,
  CONSTRAINT `REL_TRUEQUE_PUB`
    FOREIGN KEY (`idTrueque`)
    REFERENCES `fedeteria-db`.`Trueque` (`idTrueque`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `REL_PUB_TRUEQUE`
    FOREIGN KEY (`idPublicacion`)
    REFERENCES `fedeteria-db`.`Publicacion` (`idPublicacion`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
