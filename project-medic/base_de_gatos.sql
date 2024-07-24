-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-07-2024 a las 22:19:02
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `base_de_gatos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `citas`
--

CREATE TABLE `citas` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `doctor_seleccionado` varchar(100) NOT NULL,
  `dia_cita` varchar(100) NOT NULL,
  `hora_cita` varchar(100) NOT NULL,
  `razon_cita` varchar(100) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL,
  `especialidad` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `citas`
--

INSERT INTO `citas` (`id`, `email`, `doctor_seleccionado`, `dia_cita`, `hora_cita`, `razon_cita`, `createdAt`, `updatedAt`, `especialidad`) VALUES
(1, 'admin@gmail.com', 'Dr. Roberto Hernandez Gomes', '01/07/2024', '', 'Lele pancha', '2024-06-28', '2024-06-28', NULL),
(2, 'admin@gmail.com', 'Dr. Roberto Hernandez Gomes', '01/07/2024', 'h13', 'Lele pancha', '2024-06-28', '2024-06-28', 'General'),
(3, 'admin@gmail.com', 'Dra. Raul Jimenes Duran', '05/06/2024', 'h8', 'niognuna', '2024-06-28', '2024-06-28', 'Pediatria'),
(4, 'admin@gmail.com', 'Dr. Roberto Hernandez Gomes', '10/07/2024', '11:00', 'Dinero', '2024-07-22', '2024-07-22', 'General'),
(5, 'admin@gmail.com', 'Dra. Raul Jimenes Duran', '26/07/2024', '12:30', 'tos', '2024-07-24', '2024-07-24', 'Pediatria'),
(6, 'admin@gmail.com', 'Dra. Raul Jimenes Duran', '18/07/2024', '13:30', 'tos', '2024-07-24', '2024-07-24', 'Pediatria');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuentas`
--

CREATE TABLE `cuentas` (
  `id` int(11) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(150) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL,
  `fecha_de_nacimiento` varchar(255) DEFAULT NULL,
  `numero_de_telefono` varchar(150) DEFAULT NULL,
  `genero` varchar(50) DEFAULT NULL,
  `curp` varchar(18) DEFAULT NULL,
  `tipo_de_sangre` varchar(10) DEFAULT NULL,
  `enfermedades_cronicas` varchar(255) DEFAULT NULL,
  `isMenor` tinyint(1) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `tipo_de_cuenta` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cuentas`
--

INSERT INTO `cuentas` (`id`, `email`, `password`, `createdAt`, `updatedAt`, `fecha_de_nacimiento`, `numero_de_telefono`, `genero`, `curp`, `tipo_de_sangre`, `enfermedades_cronicas`, `isMenor`, `isActive`, `nombre`, `tipo_de_cuenta`) VALUES
(1, 'admin@gmail.com', '123456', '0000-00-00', '2024-06-30', '12 junio 2000', '7831347315', 'masculino', 'HECA000627HTSRRLA0', 'A+', 'Ninguna', 0, 1, 'Dominick Santorsky', 'paciente'),
(2, 'dinero@gmail.com', 'dinero12', '0000-00-00', '2024-06-30', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL),
(15, 'sasukedarkest@gmail.com', '12345', '2024-06-26', '2024-06-30', '8 Agosto 2000', '2147483647', 'masculino', 'HECA000627HTSRRLA0', 'O-', 'ninguno', 0, 1, 'Aldo Hernandez Cruz', 'paciente'),
(16, 'sasukedarkest@gmail.com', '12345', '2024-06-26', '2024-06-30', '8 Agosto 2000', '2147483647', 'masculino', 'HECA000627HTSRRLA0', 'O-', 'ninguno', 0, 1, 'Aldo Hernandez Cruz', 'paciente'),
(17, 'sasukedarkest@gmail.com', '12345', '2024-06-26', '2024-06-30', '8 Agosto 2000', '2147483647', 'masculino', 'HECA000627HTSRRLA0', 'O-', 'ninguno', 0, 1, 'Aldo Hernandez Cruz', 'paciente'),
(18, 'sasukedarkest@gmail.com', '12345', '2024-06-26', '2024-06-30', '8 Agosto 2000', '7831347315', 'masculino', 'HECA000627HTSRRLA0', 'O-', 'ninguno', 0, 1, 'Aldo Hernandez Cruz', 'paciente'),
(19, 'chido@gmail.com', '12345', '2024-06-26', '2024-06-30', '7 Junio 2000', '7831347315', 'masculino', 'HECA000627HTSRRLA0', 'AB-', '', 0, 1, 'Aldo ', 'paciente'),
(20, 'aldohernandezcruz115@gmail.com', '12345', '2024-06-29', '2024-06-29', '8 Agosto 2000', '7831347315', 'masculino', 'HECA000627HTSRRLA0', 'O-', 'Tos cronica', 0, 1, 'Aldo Hernandez Cruz', 'paciente'),
(21, 'aldochido@gmail.com', '123456', '2024-07-22', '2024-07-22', '6 Junio 1998', '7831347315', 'masculino', 'HECA000627HTSSRLA0', 'AB+', 'Asma', 0, 0, 'Aldo hernandez chido', 'paciente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuentas_doctores`
--

CREATE TABLE `cuentas_doctores` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `especialidad` varchar(100) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL,
  `tipo_de_cuenta` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cuentas_doctores`
--

INSERT INTO `cuentas_doctores` (`id`, `nombre`, `email`, `password`, `especialidad`, `createdAt`, `updatedAt`, `tipo_de_cuenta`) VALUES
(1, 'Dr. Roberto Hernandez Gomes', 'gomes@gmail.com', '123456', 'General', '0000-00-00', '0000-00-00', 'doctor'),
(2, 'Dra. Raul Jimenes Duran', 'raul@gmail.com', '123456', 'Pediatria', '0000-00-00', '0000-00-00', 'doctor'),
(3, 'Dra. Aurora Hernandez Cruz', 'aurora@gmail.com', '123456', 'Oftamologo', '0000-00-00', '0000-00-00', 'doctor');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `citas`
--
ALTER TABLE `citas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cuentas`
--
ALTER TABLE `cuentas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cuentas_doctores`
--
ALTER TABLE `cuentas_doctores`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `citas`
--
ALTER TABLE `citas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `cuentas`
--
ALTER TABLE `cuentas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `cuentas_doctores`
--
ALTER TABLE `cuentas_doctores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
