-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 17, 2025 at 04:50 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rotthuctap`
--
CREATE DATABASE IF NOT EXISTS `rotthuctap` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `rotthuctap`;

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `email`, `password`) VALUES
(1, 'admin@gmail.com', '12345');

-- --------------------------------------------------------

--
-- Table structure for table `nhiemvu`
--

CREATE TABLE `nhiemvu` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `mota` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `ngaytao` date NOT NULL,
  `ngongu` varchar(30) NOT NULL,
  `node` varchar(255) NOT NULL,
  `start` date DEFAULT NULL,
  `end` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nhiemvu`
--

INSERT INTO `nhiemvu` (`id`, `name`, `mota`, `image`, `ngaytao`, `ngongu`, `node`, `start`, `end`) VALUES
(1, 'nhiệm vụ 1', 'Mô tả nhiệm vụ 1', '/images/istockphoto-1381218042-612x612.jpg', '2025-01-01', 'Reactjs', '', '2025-01-01', '2025-01-01'),
(2, 'nhiệm vụ 2', 'Mô tả nhiệm vụ 2', '/images/istockphoto-1381218042-612x612.jpg', '2025-01-01', 'Reactjs', '', '2025-01-01', '2025-01-01');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id` int(11) NOT NULL,
  `name` varchar(40) NOT NULL,
  `email` varchar(100) NOT NULL,
  `sdt` varchar(20) NOT NULL,
  `password` varchar(40) NOT NULL,
  `mssv` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`id`, `name`, `email`, `sdt`, `password`, `mssv`) VALUES
(1, 'nguyễn văn a', 'nguyenvana@gmail.com', '0964523167', '12345', ''),
(4, '', 'nguyenvanb@gmail.com', '', '12345', ''),
(5, '', 'nguyenvanc@gmail.com', '', '12345', ''),
(6, '', 'nguyenvand@gmail.com', '', '12345', ''),
(7, 'Ngô Quang Ý', 'ngoquangy@gmail.com', '0964523167', '12345', '21103118');

-- --------------------------------------------------------

--
-- Table structure for table `s_nhiemvu`
--

CREATE TABLE `s_nhiemvu` (
  `id` int(11) NOT NULL,
  `id_student` int(11) NOT NULL,
  `id_nhiemvu` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `s_nhiemvu`
--

INSERT INTO `s_nhiemvu` (`id`, `id_student`, `id_nhiemvu`) VALUES
(19, 1, 1),
(24, 4, 1),
(25, 1, 2),
(26, 7, 1),
(27, 7, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `nhiemvu`
--
ALTER TABLE `nhiemvu`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `s_nhiemvu`
--
ALTER TABLE `s_nhiemvu`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `nhiemvu`
--
ALTER TABLE `nhiemvu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `s_nhiemvu`
--
ALTER TABLE `s_nhiemvu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
