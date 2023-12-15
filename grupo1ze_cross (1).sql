-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-11-2020 a las 22:58:42
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `grupo1ze_cross`
--
CREATE DATABASE IF NOT EXISTS `grupo1ze_cross` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `grupo1ze_cross`;

DELIMITER $$
--
-- Procedimientos
--
DROP PROCEDURE IF EXISTS `spAtletaById`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `spAtletaById` (IN `id` INT)  NO SQL
BEGIN
SELECT * FROM atletas INNER JOIN usuarios ON usuarios.idUsuario = atletas.idAtleta WHERE atletas.idAtleta = id;
END$$

DROP PROCEDURE IF EXISTS `spAtletasCategoria`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `spAtletasCategoria` (IN `pIdCategoria` INT)  NO SQL
SELECT * FROM atletas 
INNER JOIN usuarios WHERE usuarios.idUsuario=atletas.idAtleta AND usuarios.idCategoria= pIdCategoria$$

DROP PROCEDURE IF EXISTS `spAtletasEntrenador`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `spAtletasEntrenador` (IN `pId` INT)  NO SQL
SELECT * FROM atletas

INNER JOIN usuarios WHERE usuarios.idUsuario=atletas.idAtleta AND atletas.idEntrenador= pId$$

DROP PROCEDURE IF EXISTS `spDelete`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `spDelete` (IN `pId` INT)  NO SQL
BEGIN
delete from usuarios 
where usuarios.idUsuario=pId;

DELETE FROM atletas
WHERE atletas.idAtleta=pId;
END$$

DROP PROCEDURE IF EXISTS `spFindUser`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `spFindUser` (IN `username` VARCHAR(30))  NO SQL
BEGIN
SELECT * FROM usuarios WHERE UPPER(usuarios.usuario) = UPPER(username);
END$$

DROP PROCEDURE IF EXISTS `spFindUserById`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `spFindUserById` (IN `id` INT)  NO SQL
BEGIN
SELECT * FROM usuarios WHERE usuarios.idUsuario = id;
END$$

DROP PROCEDURE IF EXISTS `spIdCategorias`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `spIdCategorias` (IN `pIdCategoria` INT)  NO SQL
SELECT * FROM categorias

WHERE categorias.idCategoria=pIdCategoria$$

DROP PROCEDURE IF EXISTS `spIdEntrenador`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `spIdEntrenador` (IN `pId` INT)  NO SQL
SELECT * FROM entrenadores 
INNER JOIN usuarios WHERE usuarios.idUsuario=pId AND usuarios.idUsuario= entrenadores.idEntrenador$$

DROP PROCEDURE IF EXISTS `spInsert`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `spInsert` (IN `pNombre` VARCHAR(100), IN `pApellido` VARCHAR(100), IN `pCorreo` VARCHAR(100), IN `pIdentrenador` INT, IN `pIdCategoria` INT, IN `pEdad` INT, IN `pFoto` VARCHAR(500), IN `pSexo` VARCHAR(100))  NO SQL
BEGIN
DECLARE pId INT;
INSERT INTO usuarios (usuarios.nombre,usuarios.apellido,usuarios.usuario, usuarios.password, usuarios.idCategoria, usuarios.foto) values(pNombre,pApellido,pNombre,pNombre,pIdCategoria,pfoto);
SELECT MAX(usuarios.idUsuario) INTO pId FROM usuarios;
INSERT INTO atletas VALUES(pId,pCorreo,pSexo,pEdad,pIdentrenador);
END$$

DROP PROCEDURE IF EXISTS `spInsertComment`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `spInsertComment` (IN `idUsuario` INT, IN `asunto` VARCHAR(50), IN `texto` VARCHAR(256))  NO SQL
BEGIN
INSERT INTO comentarios VALUES ( NULL, idUsuario, asunto, texto );
END$$

DROP PROCEDURE IF EXISTS `spIsEntrenador`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `spIsEntrenador` (IN `id` INT)  NO SQL
BEGIN
SELECT COUNT(*) AS amount FROM entrenadores WHERE entrenadores.idEntrenador = id;
END$$

DROP PROCEDURE IF EXISTS `spListaAtletas`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `spListaAtletas` ()  NO SQL
SELECT * FROM atletas INNER JOIN usuarios ON usuarios.idUsuario=atletas.idAtleta$$

DROP PROCEDURE IF EXISTS `spListaCategorias`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `spListaCategorias` ()  NO SQL
SELECT * FROM categorias$$

DROP PROCEDURE IF EXISTS `spListaEntrenadores`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `spListaEntrenadores` ()  NO SQL
BEGIN
SELECT * FROM usuarios INNER JOIN entrenadores ON entrenadores.idEntrenador = usuarios.idUsuario;
END$$

DROP PROCEDURE IF EXISTS `spListaUsuarios`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `spListaUsuarios` ()  NO SQL
SELECT * FROM usuarios$$

DROP PROCEDURE IF EXISTS `spLoadCommentsById`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `spLoadCommentsById` (IN `id` INT)  NO SQL
BEGIN
SELECT * FROM comentarios WHERE comentarios.idUsuario = id;
END$$

DROP PROCEDURE IF EXISTS `spSelectEntrenadores`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `spSelectEntrenadores` (IN `pId` INT)  NO SQL
SELECT * FROM usuarios INNER JOIN entrenadores ON entrenadores.idEntrenador= usuarios.idUsuario AND usuarios.idCategoria = pId$$

DROP PROCEDURE IF EXISTS `spUpdate`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `spUpdate` (IN `pId` INT, IN `pNombre` VARCHAR(100), IN `pApellido` VARCHAR(100), IN `pIdcategoria` INT, IN `pCorreo` VARCHAR(100), IN `pFoto` VARCHAR(500), IN `pSexo` VARCHAR(100), IN `pEdad` INT, IN `pIdentrenador` INT)  NO SQL
BEGIN
UPDATE usuarios 
SET usuarios.nombre = pNombre, 
usuarios.apellido = pApellido, 
usuarios.idCategoria= pIdCategoria,
usuarios.foto=pFoto
WHERE usuarios.idUsuario=pId;


UPDATE atletas 
SET atletas.correo=pCorreo, 
atletas.sexo=pSexo, 
atletas.edad=pEdad, 
atletas.idEntrenador=pIdentrenador
WHERE atletas.idAtleta=pId;

END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `atletas`
--

DROP TABLE IF EXISTS `atletas`;
CREATE TABLE `atletas` (
  `idAtleta` int(11) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `sexo` varchar(100) NOT NULL,
  `edad` int(11) NOT NULL,
  `idEntrenador` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `atletas`
--

INSERT INTO `atletas` (`idAtleta`, `correo`, `sexo`, `edad`, `idEntrenador`) VALUES
(7, 'ajavierirazu@gmail.com', 'M', 19, 1),
(9, 'chandler@chandler.com', 'M', 36, 1),
(10, 'sara@sara.com', 'F', 28, 1),
(11, 'tia@tia.com', 'F', 32, 1),
(12, 'catherin@catherin.com', 'F', 40, 4),
(13, 'alicia@alicia.com', 'F', 34, 1),
(14, 'pedro@pedro.com', 'M', 75, 3),
(15, 'aida@aida.com', 'F', 70, 3),
(16, 'eloy@prueba.com', 'M', 12, 2),
(17, 'amaia@amaia.com', 'F', 15, 2),
(19, 'gaizka@gmail.com', 'M', 19, 1),
(20, '0', 'F', 1, 2),
(21, 'koldo.99@gmail.com', 'M', 56, 3),
(22, 'keanuREEEEEEEVES@mini.keanu', 'M', 56, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

DROP TABLE IF EXISTS `categorias`;
CREATE TABLE `categorias` (
  `idCategoria` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `edad` varchar(100) NOT NULL,
  `precio` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`idCategoria`, `nombre`, `edad`, `precio`) VALUES
(1, 'Teen', '0-16', 15),
(2, 'Elite', '16-50', 20),
(3, 'Master', '50-100', 25);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

DROP TABLE IF EXISTS `comentarios`;
CREATE TABLE `comentarios` (
  `idComentario` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `asunto` varchar(100) NOT NULL,
  `texto` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `comentarios`
--

INSERT INTO `comentarios` (`idComentario`, `idUsuario`, `asunto`, `texto`) VALUES
(10, 1, 'TEST', 'TEST TEXT'),
(11, 1, 'TEST 2', 'TEST TEXT 2'),
(12, 21, 'Hola soy Gotzon', 'Y soy alcoholico                            ');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entrenadores`
--

DROP TABLE IF EXISTS `entrenadores`;
CREATE TABLE `entrenadores` (
  `idEntrenador` int(11) NOT NULL,
  `nivel` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_german2_ci NOT NULL,
  `experiencia` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `entrenadores`
--

INSERT INTO `entrenadores` (`idEntrenador`, `nivel`, `experiencia`) VALUES
(1, 'L3', '20 años'),
(2, 'L1', '10 años'),
(3, 'L2', '15 años'),
(4, 'L3', '7 años');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `idUsuario` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `usuario` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `admin` int(11) NOT NULL,
  `idCategoria` int(11) NOT NULL,
  `foto` varchar(255) NOT NULL DEFAULT 'default.jpg'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `nombre`, `apellido`, `usuario`, `password`, `admin`, `idCategoria`, `foto`) VALUES
(1, 'Jon', 'Orduña', 'jon', 'j0n', 1, 2, 'default.jpg'),
(2, 'Julen', 'Martinez', 'julen', 'julen', 0, 1, 'default.jpg'),
(3, 'Alex ', 'Hernandez', 'alex', 'alex', 0, 3, 'default.jpg'),
(4, 'Iñaki', 'Zubiarte', 'iñaki', 'iñaki', 0, 2, 'default.jpg'),
(7, 'Aingeru', 'Javier', 'aingeru', 'aingeru', 0, 2, 'idlys5.gif'),
(9, 'Chandler', 'Smith', 'chandler', 'chandler', 0, 2, 'hombre_3.jpg'),
(10, 'Sara', 'Guru', 'sara', 'sara', 0, 2, 'mujer_1.jpg'),
(11, 'Tia', 'Claid ', 'tia ', 'tia', 0, 2, 'mujer_2.jpg'),
(12, 'Catherin', 'Davis', 'catherin', 'catherin', 0, 2, 'muro.jpg'),
(13, 'Sara Alicia', 'Fernandez', 'alicia', 'alicia', 0, 2, 'embarazada.png'),
(14, 'Pedro', 'Iturralde', 'pedro', 'pedro', 0, 3, 'senor.jpg'),
(15, 'Aida', 'Esquiroz', 'aida', 'aida', 0, 3, 'senora.jpg'),
(16, 'Eloy', 'Bailos', 'eloy', 'eloy', 0, 1, 'nino.jpg'),
(17, 'Amaia', 'Autor', 'amaia', 'amaia', 0, 1, 'nina.jpg'),
(19, 'Gaizka', 'Jimenez', 'Gaizka', 'Gaizka', 0, 2, 'terieh.gif'),
(20, 'prueba', 'usuario_estandar', 'prueba', 'prueba', 0, 1, 'cross4.jpg'),
(21, 'Gotzon', 'Asueta', 'Gotzon', 'Gotzon', 0, 3, 'koldibloqes.jpg'),
(22, 'Keanu', 'Reeves', 'Keanu', 'Keanu', 0, 3, 'keanu.jpg');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `atletas`
--
ALTER TABLE `atletas`
  ADD PRIMARY KEY (`idAtleta`),
  ADD KEY `participantes_ibfk_1` (`idEntrenador`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`idCategoria`);

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`idComentario`),
  ADD KEY `comentarioUsuario` (`idUsuario`);

--
-- Indices de la tabla `entrenadores`
--
ALTER TABLE `entrenadores`
  ADD PRIMARY KEY (`idEntrenador`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuario`),
  ADD KEY `cat_ibfk_1` (`idCategoria`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `idCategoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `idComentario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `atletas`
--
ALTER TABLE `atletas`
  ADD CONSTRAINT `atletaEntrenador` FOREIGN KEY (`idEntrenador`) REFERENCES `entrenadores` (`idEntrenador`),
  ADD CONSTRAINT `atletaUsuario` FOREIGN KEY (`idAtleta`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentarioUsuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`);

--
-- Filtros para la tabla `entrenadores`
--
ALTER TABLE `entrenadores`
  ADD CONSTRAINT `EntrenadorUsuario` FOREIGN KEY (`idEntrenador`) REFERENCES `usuarios` (`idUsuario`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarioCategoria` FOREIGN KEY (`idCategoria`) REFERENCES `categorias` (`idCategoria`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
