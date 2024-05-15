-- -----------------------------------------------------
-- Table `fedeteria-db`.`usuario`
-- -----------------------------------------------------
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

DROP TABLE IF EXISTS `fedeteria-db`.`usuario` ;

CREATE SCHEMA IF NOT EXISTS `fedeteria-db` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin ;
USE `fedeteria-db` ;

CREATE TABLE IF NOT EXISTS `fedeteria-db`.`usuario` (
  `DNI` BIGINT NOT NULL,
  `nombre` VARCHAR(20) COLLATE 'utf8mb3_bin' NOT NULL,
  `apellido` VARCHAR(20) COLLATE 'utf8mb3_bin' NOT NULL,
  `contra` VARCHAR(60) COLLATE 'utf8mb3_bin' NOT NULL,
  `mail` VARCHAR(50) COLLATE 'utf8mb3_bin' NOT NULL,
  `recibeAnuncio` VARCHAR(2) COLLATE 'utf8mb3_bin' NULL DEFAULT 'no',
  `fechaNacimiento` DATE NOT NULL,
  PRIMARY KEY (`DNI`),
  UNIQUE INDEX `DNI_UNIQUE` (`DNI`),
  UNIQUE INDEX `mail_UNIQUE` (`mail`)
) ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fedeteria-db`.`admin`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fedeteria-db`.`admin` ;

CREATE TABLE IF NOT EXISTS `fedeteria-db`.`admin` (
  `DNI` BIGINT NOT NULL,
  PRIMARY KEY (`DNI`),
  CONSTRAINT `Admin_DNI_FK`
    FOREIGN KEY (`DNI`)
    REFERENCES `fedeteria-db`.`usuario` (`DNI`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fedeteria-db`.`cliente`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fedeteria-db`.`cliente` ;

CREATE TABLE IF NOT EXISTS `fedeteria-db`.`cliente` (
  `DNI` BIGINT NOT NULL,
  PRIMARY KEY (`DNI`),
  CONSTRAINT `Cliente_DNI_FK`
    FOREIGN KEY (`DNI`)
    REFERENCES `fedeteria-db`.`usuario` (`DNI`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fedeteria-db`.`empleado`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fedeteria-db`.`empleado` ;

CREATE TABLE IF NOT EXISTS `fedeteria-db`.`empleado` (
  `DNI` BIGINT NOT NULL,
  PRIMARY KEY (`DNI`),
  CONSTRAINT `Empleado_DNI_FK`
    FOREIGN KEY (`DNI`)
    REFERENCES `fedeteria-db`.`usuario` (`DNI`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fedeteria-db`.`publicacion`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fedeteria-db`.`publicacion` ;

CREATE TABLE IF NOT EXISTS `fedeteria-db`.`publicacion` (
  `idPublicacion` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `DNI` BIGINT NOT NULL,
  `nombre` VARCHAR(50) NOT NULL,
  `precio` FLOAT UNSIGNED NOT NULL DEFAULT '0',
  `descripcion` VARCHAR(255) COLLATE 'utf8mb3_bin' NOT NULL,
  `destacada` VARCHAR(2) COLLATE 'utf8mb3_bin' NOT NULL DEFAULT 'no',
  `productoACambio` VARCHAR(255) COLLATE 'utf8mb3_bin' NULL,
  `estado` VARCHAR(5) NOT NULL,
  PRIMARY KEY (`idPublicacion`),
  INDEX `DNI_idx` (`DNI`),
  CONSTRAINT `Publicacion_DNI_FK`
    FOREIGN KEY (`DNI`)
    REFERENCES `fedeteria-db`.`cliente` (`DNI`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fedeteria-db`.`foto`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fedeteria-db`.`foto` ;

CREATE TABLE IF NOT EXISTS `fedeteria-db`.`foto` (
  `idFoto` INT NOT NULL AUTO_INCREMENT,
  `foto` BLOB NULL DEFAULT NULL,
  `idPublicacion` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`idFoto`),
  INDEX `idPublicacion_idx` (`idPublicacion`),
  CONSTRAINT `idPublicacion`
    FOREIGN KEY (`idPublicacion`)
    REFERENCES `fedeteria-db`.`publicacion` (`idPublicacion`)
) ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fedeteria-db`.`local`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fedeteria-db`.`local` ;

CREATE TABLE IF NOT EXISTS `fedeteria-db`.`local` (
  `idLocal` INT UNSIGNED NOT NULL,
  `nombre` VARCHAR(60) NOT NULL,
  `calle` VARCHAR(60) COLLATE 'utf8mb3_bin' NOT NULL,
  `numero` VARCHAR(10) COLLATE 'utf8mb3_bin' NOT NULL,
  `piso` VARCHAR(20) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `depto` VARCHAR(20) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  PRIMARY KEY (`idLocal`)
) ENGINE = InnoDB;
SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
