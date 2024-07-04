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
CREATE SCHEMA IF NOT EXISTS `fedeteria-db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `fedeteria-db` ;

-- -----------------------------------------------------
-- Table `fedeteria-db`.`usuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fedeteria-db`.`usuario` ;

CREATE TABLE IF NOT EXISTS `fedeteria-db`.`usuario` (
  `DNI` BIGINT NOT NULL,
  `nombre` VARCHAR(20) CHARACTER SET 'utf8mb3' NOT NULL,
  `apellido` VARCHAR(20) CHARACTER SET 'utf8mb3' NOT NULL,
  `contra` VARCHAR(60) CHARACTER SET 'utf8mb3' NOT NULL,
  `mail` VARCHAR(50) CHARACTER SET 'utf8mb3' NOT NULL,
  `recibeAnuncio` VARCHAR(2) CHARACTER SET 'utf8mb3' NULL DEFAULT 'no',
  `fechaNacimiento` DATE NOT NULL,
  `bloqueada` TINYINT UNSIGNED NULL DEFAULT '0',
  PRIMARY KEY (`DNI`),
  UNIQUE INDEX `DNI_UNIQUE` (`DNI` ASC) VISIBLE,
  UNIQUE INDEX `mail_UNIQUE` (`mail` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `fedeteria-db`.`admin`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fedeteria-db`.`admin` ;

CREATE TABLE IF NOT EXISTS `fedeteria-db`.`admin` (
  `DNI` BIGINT NOT NULL,
  PRIMARY KEY (`DNI`),
  UNIQUE INDEX `DNI_UNIQUE` (`DNI` ASC) VISIBLE,
  CONSTRAINT `Admin_DNI_FK`
    FOREIGN KEY (`DNI`)
    REFERENCES `fedeteria-db`.`usuario` (`DNI`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `fedeteria-db`.`local`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fedeteria-db`.`local` ;

CREATE TABLE IF NOT EXISTS `fedeteria-db`.`local` (
  `idLocal` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(60) NOT NULL,
  `calle` VARCHAR(60) CHARACTER SET 'utf8mb3' NOT NULL,
  `numero` VARCHAR(10) CHARACTER SET 'utf8mb3' NOT NULL,
  `piso` VARCHAR(20) CHARACTER SET 'utf8mb3' NULL DEFAULT NULL,
  `depto` VARCHAR(20) CHARACTER SET 'utf8mb3' NULL DEFAULT NULL,
  PRIMARY KEY (`idLocal`),
  UNIQUE INDEX `idLocal_UNIQUE` (`idLocal` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fedeteria-db`.`cliente`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fedeteria-db`.`cliente` ;

CREATE TABLE IF NOT EXISTS `fedeteria-db`.`cliente` (
  `DNI` BIGINT NOT NULL,
  `idLocal` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`DNI`),
  UNIQUE INDEX `DNI_UNIQUE` (`DNI` ASC) VISIBLE,
  INDEX `Cliente_Local_FK_idx` (`idLocal` ASC) VISIBLE,
  CONSTRAINT `Cliente_DNI_FK`
    FOREIGN KEY (`DNI`)
    REFERENCES `fedeteria-db`.`usuario` (`DNI`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `Cliente_Local_FK`
    FOREIGN KEY (`idLocal`)
    REFERENCES `fedeteria-db`.`local` (`idLocal`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fedeteria-db`.`publicacion`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fedeteria-db`.`publicacion` ;

CREATE TABLE IF NOT EXISTS `fedeteria-db`.`publicacion` (
  `idPublicacion` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `DNI` BIGINT NOT NULL,
  `nombre` VARCHAR(50) NOT NULL,
  `precio` FLOAT UNSIGNED NOT NULL DEFAULT '0',
  `descripcion` VARCHAR(255) CHARACTER SET 'utf8mb3' NOT NULL,
  `destacada` VARCHAR(2) CHARACTER SET 'utf8mb3' NOT NULL DEFAULT 'no',
  `productoACambio` VARCHAR(255) CHARACTER SET 'utf8mb3' NULL DEFAULT NULL,
  `estado` VARCHAR(5) NOT NULL,
  `rechazado` TINYINT UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`idPublicacion`),
  UNIQUE INDEX `id_UNIQUE` (`idPublicacion` ASC) VISIBLE,
  INDEX `CLIENTE_PUB_FK_idx` (`DNI` ASC) VISIBLE,
  CONSTRAINT `CLIENTE_PUB_FK`
    FOREIGN KEY (`DNI`)
    REFERENCES `fedeteria-db`.`usuario` (`DNI`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fedeteria-db`.`consulta`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fedeteria-db`.`consulta` ;

CREATE TABLE IF NOT EXISTS `fedeteria-db`.`consulta` (
  `idConsulta` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `textoConsulta` TEXT NOT NULL,
  `idPublicacion` INT UNSIGNED NOT NULL,
  `dniUsuario` VARCHAR(20) NOT NULL,
  `idRespuesta` INT UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`idConsulta`),
  UNIQUE INDEX `idConsulta_UNIQUE` (`idConsulta` ASC) VISIBLE,
  INDEX `PUB_PREGUNTA_FK_idx` (`idPublicacion` ASC) VISIBLE,
  CONSTRAINT `PUB_CONSULTA_FK`
    FOREIGN KEY (`idPublicacion`)
    REFERENCES `fedeteria-db`.`publicacion` (`idPublicacion`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fedeteria-db`.`empleado`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fedeteria-db`.`empleado` ;

CREATE TABLE IF NOT EXISTS `fedeteria-db`.`empleado` (
  `DNI` BIGINT NOT NULL,
  `idLocal` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`DNI`),
  UNIQUE INDEX `idEmpleado_UNIQUE` (`DNI` ASC) INVISIBLE,
  INDEX `Empleado_Local_FK_idx` (`idLocal` ASC) VISIBLE,
  CONSTRAINT `Empleado_DNI_FK`
    FOREIGN KEY (`DNI`)
    REFERENCES `fedeteria-db`.`usuario` (`DNI`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `Empleado_Local_FK`
    FOREIGN KEY (`idLocal`)
    REFERENCES `fedeteria-db`.`local` (`idLocal`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fedeteria-db`.`foto`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fedeteria-db`.`foto` ;

CREATE TABLE IF NOT EXISTS `fedeteria-db`.`foto` (
  `idFoto` INT NOT NULL AUTO_INCREMENT,
  `foto` MEDIUMBLOB NULL DEFAULT NULL,
  `idPublicacion` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`idFoto`),
  UNIQUE INDEX `idFoto_UNIQUE` (`idFoto` ASC) VISIBLE,
  INDEX `idPublicacion_idx` (`idPublicacion` ASC) VISIBLE,
  CONSTRAINT `idPublicacion`
    FOREIGN KEY (`idPublicacion`)
    REFERENCES `fedeteria-db`.`publicacion` (`idPublicacion`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fedeteria-db`.`notificacion`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fedeteria-db`.`notificacion` ;

CREATE TABLE IF NOT EXISTS `fedeteria-db`.`notificacion` (
  `idNotificacion` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `tipo` VARCHAR(20) NOT NULL DEFAULT 'default',
  `contenido` VARCHAR(255) NOT NULL,
  `DNI` BIGINT NOT NULL,
  `nueva` VARCHAR(2) NOT NULL DEFAULT 'si',
  PRIMARY KEY (`idNotificacion`),
  INDEX `Noti_User_FK_idx` (`DNI` ASC) VISIBLE,
  CONSTRAINT `Noti_User_FK`
    FOREIGN KEY (`DNI`)
    REFERENCES `fedeteria-db`.`usuario` (`DNI`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `fedeteria-db`.`producto`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fedeteria-db`.`producto` ;

CREATE TABLE IF NOT EXISTS `fedeteria-db`.`producto` (
  `idProducto` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  `precio` FLOAT UNSIGNED NOT NULL,
  PRIMARY KEY (`idProducto`),
  UNIQUE INDEX `idProducto_UNIQUE` (`idProducto` ASC) VISIBLE)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `fedeteria-db`.`trueque`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fedeteria-db`.`trueque` ;

CREATE TABLE IF NOT EXISTS `fedeteria-db`.`trueque` (
  `idTrueque` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `hora` TIME NULL DEFAULT NULL,
  `fecha` DATE NULL DEFAULT NULL,
  `realizado` TINYINT NULL DEFAULT NULL,
  `productoDeseado` INT UNSIGNED NOT NULL,
  `idLocal` INT UNSIGNED NULL DEFAULT NULL,
  `codigo` VARCHAR(10) NULL DEFAULT NULL,
  PRIMARY KEY (`idTrueque`),
  UNIQUE INDEX `idTrueque_UNIQUE` (`idTrueque` ASC) VISIBLE,
  UNIQUE INDEX `codigo_UNIQUE` (`codigo` ASC) VISIBLE,
  INDEX `PUB_PRIN_TRUEQUE_FK_idx` (`productoDeseado` ASC) VISIBLE,
  INDEX `TRUEQUE_LOCAL_FK_idx` (`idLocal` ASC) VISIBLE,
  CONSTRAINT `PUB_PRIN_TRUEQUE_FK`
    FOREIGN KEY (`productoDeseado`)
    REFERENCES `fedeteria-db`.`publicacion` (`idPublicacion`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `TRUEQUE_LOCAL_FK`
    FOREIGN KEY (`idLocal`)
    REFERENCES `fedeteria-db`.`local` (`idLocal`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fedeteria-db`.`productoscambio`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fedeteria-db`.`productoscambio` ;

CREATE TABLE IF NOT EXISTS `fedeteria-db`.`productoscambio` (
  `idProductosCambio` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `idTrueque` INT UNSIGNED NOT NULL,
  `idPublicacion` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`idProductosCambio`),
  UNIQUE INDEX `idProductosCambio_UNIQUE` (`idProductosCambio` ASC) VISIBLE,
  INDEX `REL_TRUEQUE_PUB_idx` (`idTrueque` ASC) VISIBLE,
  INDEX `REL_PUB_TRUEQUE_idx` (`idPublicacion` ASC) VISIBLE,
  CONSTRAINT `REL_PUB_TRUEQUE`
    FOREIGN KEY (`idPublicacion`)
    REFERENCES `fedeteria-db`.`publicacion` (`idPublicacion`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `REL_TRUEQUE_PUB`
    FOREIGN KEY (`idTrueque`)
    REFERENCES `fedeteria-db`.`trueque` (`idTrueque`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `fedeteria-db`.`venta`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fedeteria-db`.`venta` ;

CREATE TABLE IF NOT EXISTS `fedeteria-db`.`venta` (
  `idVenta` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `pago` VARCHAR(35) NOT NULL,
  `dniEmpleado` BIGINT NOT NULL,
  `dniCliente` BIGINT NOT NULL,
  `precioTotal` FLOAT UNSIGNED NOT NULL,
  `idLocal` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`idVenta`),
  INDEX `LOCAL_VENTA_FK_idx` (`idLocal` ASC) VISIBLE,
  INDEX `CLIENTE_VENTA_FK_idx` (`dniCliente` ASC) VISIBLE,
  INDEX `EMPLEADO_VENTA_FK_idx` (`dniEmpleado` ASC) VISIBLE,
  CONSTRAINT `CLIENTE_VENTA_FK`
    FOREIGN KEY (`dniCliente`)
    REFERENCES `fedeteria-db`.`usuario` (`DNI`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `EMPLEADO_VENTA_FK`
    FOREIGN KEY (`dniEmpleado`)
    REFERENCES `fedeteria-db`.`usuario` (`DNI`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `LOCAL_VENTA_FK`
    FOREIGN KEY (`idLocal`)
    REFERENCES `fedeteria-db`.`local` (`idLocal`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fedeteria-db`.`productosvendidos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fedeteria-db`.`productosvendidos` ;

CREATE TABLE IF NOT EXISTS `fedeteria-db`.`productosvendidos` (
  `idProductosVendidos` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `idVenta` INT UNSIGNED NOT NULL,
  `idProducto` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`idProductosVendidos`),
  INDEX `VENTA_PV_FK_idx` (`idVenta` ASC) VISIBLE,
  INDEX `PRODUCTO_PV_FK_idx` (`idProducto` ASC) VISIBLE,
  CONSTRAINT `PRODUCTO_PV_FK`
    FOREIGN KEY (`idProducto`)
    REFERENCES `fedeteria-db`.`producto` (`idProducto`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `VENTA_PV_FK`
    FOREIGN KEY (`idVenta`)
    REFERENCES `fedeteria-db`.`venta` (`idVenta`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fedeteria-db`.`respuesta`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fedeteria-db`.`respuesta` ;

CREATE TABLE IF NOT EXISTS `fedeteria-db`.`respuesta` (
  `idRespuesta` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `dniDuenoPublicacion` VARCHAR(20) NOT NULL,
  `textoRespuesta` TEXT NOT NULL,
  `idPregunta` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`idRespuesta`),
  UNIQUE INDEX `idRespuesta_UNIQUE` (`idRespuesta` ASC) VISIBLE,
  INDEX `PREGUNTA_RESPUESTA_FK_idx` (`idPregunta` ASC) VISIBLE,
  CONSTRAINT `PREGUNTA_RESPUESTA_FK`
    FOREIGN KEY (`idPregunta`)
    REFERENCES `fedeteria-db`.`pregunta` (`idPregunta`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
