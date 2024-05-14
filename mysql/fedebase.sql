-- -----------------------------------------------------
-- Schema fedeteria-db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `fedeteria-db`;
USE `fedeteria-db`;

-- -----------------------------------------------------
-- Table `fedeteria-db`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fedeteria-db`.`usuario` (
  `DNI` BIGINT NOT NULL,
  `nombre` VARCHAR(20) COLLATE 'utf8mb3_bin' NOT NULL,
  `apellido` VARCHAR(20) COLLATE 'utf8mb3_bin' NOT NULL,
  `contra` VARCHAR(60) COLLATE 'utf8mb3_bin' NOT NULL,
  `mail` VARCHAR(50) COLLATE 'utf8mb3_bin' NOT NULL,
  `recibeAnuncio` VARCHAR(2) NOT NULL DEFAULT 'no',
  `fechaNacimiento` DATE NOT NULL,
  PRIMARY KEY (`DNI`),
  UNIQUE INDEX `DNI_UNIQUE` (`DNI`),
  UNIQUE INDEX `mail_UNIQUE` (`mail`)
)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `fedeteria-db`.`admin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fedeteria-db`.`admin` (
  `DNI` BIGINT NOT NULL,
  PRIMARY KEY (`DNI`),
  CONSTRAINT `Admin_DNI_FK`
    FOREIGN KEY (`DNI`)
    REFERENCES `fedeteria-db`.`usuario` (`DNI`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `fedeteria-db`.`cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fedeteria-db`.`cliente` (
  `DNI` BIGINT NOT NULL,
  PRIMARY KEY (`DNI`),
  CONSTRAINT `Cliente_DNI_FK`
    FOREIGN KEY (`DNI`)
    REFERENCES `fedeteria-db`.`usuario` (`DNI`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `fedeteria-db`.`empleado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fedeteria-db`.`empleado` (
  `DNI` BIGINT NOT NULL,
  PRIMARY KEY (`DNI`),
  CONSTRAINT `Empleado_DNI_FK`
    FOREIGN KEY (`DNI`)
    REFERENCES `fedeteria-db`.`usuario` (`DNI`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `fedeteria-db`.`publicacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fedeteria-db`.`publicacion` (
  `idPublicacion` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `DNI` BIGINT NOT NULL,
  `nombre` VARCHAR(50) COLLATE 'utf8mb3_bin' NOT NULL,
  `precio` FLOAT UNSIGNED NOT NULL DEFAULT '0',
  `descripcion` VARCHAR(255) COLLATE 'utf8mb3_bin' NOT NULL,
  `destacada` VARCHAR(2) COLLATE 'utf8mb3_bin' NOT NULL DEFAULT 'no',
  `productoACambio` VARCHAR(255) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `estado` VARCHAR(5) NOT NULL,
  PRIMARY KEY (`idPublicacion`),
  UNIQUE INDEX `id_UNIQUE` (`idPublicacion`),
  INDEX `DNI_idx` (`DNI`),
  CONSTRAINT `Publicacion_DNI_FK`
    FOREIGN KEY (`DNI`)
    REFERENCES `fedeteria-db`.`cliente` (`DNI`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
)
ENGINE = InnoDB
AUTO_INCREMENT = 138;

-- -----------------------------------------------------
-- Table `fedeteria-db`.`foto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fedeteria-db`.`foto` (
  `idFoto` INT NOT NULL AUTO_INCREMENT,
  `foto` BLOB NOT NULL,
  `idPublicacion` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`idFoto`),
  UNIQUE INDEX `idFoto_UNIQUE` (`idFoto`),
  INDEX `idPublicacion_idx` (`idPublicacion`),
  CONSTRAINT `idPublicacion`
    FOREIGN KEY (`idPublicacion`)
    REFERENCES `fedeteria-db`.`publicacion` (`idPublicacion`)
)
ENGINE = InnoDB
AUTO_INCREMENT = 24;

-- -----------------------------------------------------
-- Table `fedeteria-db`.`local`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fedeteria-db`.`local` (
  `idLocal` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(60) NOT NULL,
  `calle` VARCHAR(60) COLLATE 'utf8mb3_bin' NOT NULL,
  `numero` VARCHAR(10) COLLATE 'utf8mb3_bin' NOT NULL,
  `piso` VARCHAR(20) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `depto` VARCHAR(20) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  PRIMARY KEY (`idLocal`),
  UNIQUE INDEX `idLocal_UNIQUE` (`idLocal`)
)
ENGINE = InnoDB
AUTO_INCREMENT = 13;