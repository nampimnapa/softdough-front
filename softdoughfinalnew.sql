-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 06, 2024 at 02:05 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `softdoughfinalnew`
--

-- --------------------------------------------------------

--
-- Table structure for table `expenses`
--

CREATE TABLE `expenses` (
  `ep_id` int(11) NOT NULL,
  `ep_sum` float DEFAULT NULL,
  `ep_note` varchar(255) DEFAULT NULL,
  `ep_status` varchar(1) DEFAULT NULL,
  `ept_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `deleted_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `expensestype`
--

CREATE TABLE `expensestype` (
  `ept_id` int(11) NOT NULL,
  `ept_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ingredient`
--

CREATE TABLE `ingredient` (
  `ind_id` int(11) NOT NULL,
  `ind_name` varchar(255) DEFAULT NULL,
  `qtyminimum` int(11) DEFAULT NULL,
  `qty_per_unit` int(11) DEFAULT NULL,
  `ind_stock` int(11) DEFAULT NULL,
  `un_purchased` int(11) NOT NULL,
  `un_ind` int(11) NOT NULL,
  `status` varchar(1) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `ingredient`
--

INSERT INTO `ingredient` (`ind_id`, `ind_name`, `qtyminimum`, `qty_per_unit`, `ind_stock`, `un_purchased`, `un_ind`, `status`, `created_at`, `updated_at`) VALUES
(1, 'แป้งอเนกประสงค์', 2, 250, 96, 5, 1, '2', '2024-07-28 01:26:58', '2024-07-28 01:26:58'),
(2, 'นมจืด', 3, 1, 45, 3, 4, '2', '2024-07-28 01:27:48', '2024-07-28 01:27:48'),
(3, 'น้ำตาลทราย', 5, 250, 95, 5, 1, '2', '2024-07-28 01:28:31', '2024-07-28 01:28:31'),
(4, 'ผงยีสต์', 3, 100, 0, 5, 1, '0', '2024-08-03 13:01:22', '2024-08-03 13:01:22');

-- --------------------------------------------------------

--
-- Table structure for table `ingredient_lot`
--

CREATE TABLE `ingredient_lot` (
  `indl_id` int(11) NOT NULL,
  `status` varchar(1) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `ingredient_lot`
--

INSERT INTO `ingredient_lot` (`indl_id`, `status`, `created_at`, `updated_at`) VALUES
(1, '2', '2024-07-28 01:29:43', '2024-07-28 01:29:43');

-- --------------------------------------------------------

--
-- Table structure for table `ingredient_lot_detail`
--

CREATE TABLE `ingredient_lot_detail` (
  `indlde_id` int(11) NOT NULL,
  `qtypurchased` int(11) DEFAULT NULL,
  `date_exp` datetime DEFAULT NULL,
  `price` float DEFAULT NULL,
  `ind_id` int(11) NOT NULL,
  `indl_id` int(11) NOT NULL,
  `qty_stock` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `deleted_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `ingredient_lot_detail`
--

INSERT INTO `ingredient_lot_detail` (`indlde_id`, `qtypurchased`, `date_exp`, `price`, `ind_id`, `indl_id`, `qty_stock`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 100, '2029-07-03 00:00:00', 1000, 1, 1, 24000, '2024-07-28 01:29:43', '2024-07-28 01:29:43', NULL),
(2, 50, '2029-07-03 00:00:00', 500, 2, 1, 45, '2024-07-28 01:29:43', '2024-07-28 01:29:43', NULL),
(3, 100, '2029-07-03 00:00:00', 1000, 3, 1, 23750, '2024-07-28 01:29:43', '2024-07-28 01:29:43', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ingredient_used`
--

CREATE TABLE `ingredient_used` (
  `indU_id` int(11) NOT NULL,
  `status` varchar(1) DEFAULT NULL,
  `note` text DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `ingredient_used`
--

INSERT INTO `ingredient_used` (`indU_id`, `status`, `note`, `created_at`, `updated_at`) VALUES
(1, '2', 'ทดลองเค้ก', '2024-07-28 01:30:40', '2024-07-28 01:30:40');

-- --------------------------------------------------------

--
-- Table structure for table `ingredient_used_detail`
--

CREATE TABLE `ingredient_used_detail` (
  `indUd_id` int(11) NOT NULL,
  `indU_id` int(11) NOT NULL,
  `indlde_id` int(11) NOT NULL,
  `qty_used_sum` int(11) DEFAULT NULL,
  `scrap` int(11) DEFAULT NULL,
  `qtyusesum` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `deleted_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `ingredient_used_detail`
--

INSERT INTO `ingredient_used_detail` (`indUd_id`, `indU_id`, `indlde_id`, `qty_used_sum`, `scrap`, `qtyusesum`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 1, 2, 0, 500, '2024-07-28 01:30:40', '2024-07-28 01:30:40', NULL),
(2, 1, 2, 1, 0, 1, '2024-07-28 01:30:40', '2024-07-28 01:30:40', NULL),
(3, 1, 3, 3, 0, 750, '2024-07-28 01:30:40', '2024-07-28 01:30:40', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ingredient_used_pro`
--

CREATE TABLE `ingredient_used_pro` (
  `induP_id` int(11) NOT NULL,
  `pdod_id` int(11) NOT NULL,
  `indlde_id` int(11) NOT NULL,
  `qty_used_sum` int(11) DEFAULT NULL,
  `status` varchar(1) DEFAULT NULL,
  `scrap` int(11) DEFAULT NULL,
  `qtyusesum` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `deleted_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `ingredient_used_pro`
--

INSERT INTO `ingredient_used_pro` (`induP_id`, `pdod_id`, `indlde_id`, `qty_used_sum`, `status`, `scrap`, `qtyusesum`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 5, 1, 1, '2', 0, 250, '2024-07-28 02:04:47', '2024-07-28 02:04:47', NULL),
(2, 5, 2, 2, '2', 0, 2, '2024-07-28 02:04:47', '2024-07-28 02:04:47', NULL),
(3, 5, 3, 1, '2', 0, 250, '2024-07-28 02:04:47', '2024-07-28 02:04:47', NULL),
(4, 43, 1, 1, '2', 0, 250, '2024-07-29 14:12:04', '2024-07-29 14:12:04', NULL),
(5, 43, 2, 2, '2', 0, 2, '2024-07-29 14:12:04', '2024-07-29 14:12:04', NULL),
(6, 43, 3, 1, '2', 0, 250, '2024-07-29 14:12:04', '2024-07-29 14:12:04', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `productcategory`
--

CREATE TABLE `productcategory` (
  `pdc_id` int(11) NOT NULL,
  `pdc_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `productcategory`
--

INSERT INTO `productcategory` (`pdc_id`, `pdc_name`) VALUES
(1, 'โดนัท'),
(2, 'ดิป');

-- --------------------------------------------------------

--
-- Table structure for table `productionorder`
--

CREATE TABLE `productionorder` (
  `pdo_id` int(11) NOT NULL,
  `cost_pricesum` float DEFAULT NULL,
  `pdo_status` varchar(1) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `productionorder`
--

INSERT INTO `productionorder` (`pdo_id`, `cost_pricesum`, `pdo_status`, `created_at`, `updated_at`) VALUES
(1, NULL, '2', '2024-07-28 01:36:45', '2024-07-28 01:36:45'),
(2, NULL, '1', '2024-07-28 01:42:10', '2024-07-28 01:42:10'),
(3, NULL, '2', '2024-07-28 01:50:19', '2024-07-28 01:50:19'),
(4, NULL, '2', '2024-07-28 02:01:16', '2024-07-28 02:01:16'),
(5, NULL, '4', '2024-07-28 02:02:12', '2024-07-28 02:02:12'),
(6, NULL, '2', '2024-07-29 00:03:41', '2024-07-29 00:03:41'),
(7, NULL, '1', '2024-07-29 00:17:13', '2024-07-29 00:17:13'),
(8, NULL, '1', '2024-07-29 00:21:23', '2024-07-29 00:21:23'),
(9, NULL, '1', '2024-07-29 00:30:14', '2024-07-29 00:30:14'),
(10, NULL, '2', '2024-07-29 00:32:30', '2024-07-29 00:32:30'),
(11, NULL, '1', '2024-07-29 00:36:24', '2024-07-29 00:36:24'),
(12, NULL, '1', '2024-07-29 00:36:59', '2024-07-29 00:36:59'),
(13, NULL, '1', '2024-07-29 00:37:57', '2024-07-29 00:37:57'),
(14, NULL, '3', '2024-07-29 00:38:51', '2024-07-29 00:38:51'),
(15, NULL, '2', '2024-07-29 00:39:31', '2024-07-29 00:39:31'),
(16, NULL, '3', '2024-07-29 01:10:56', '2024-07-29 01:10:56'),
(17, NULL, '3', '2024-07-29 01:31:17', '2024-07-29 01:31:17'),
(18, NULL, '3', '2024-07-29 01:42:26', '2024-07-29 01:42:26'),
(19, NULL, '3', '2024-07-29 01:43:32', '2024-07-29 01:43:32'),
(20, NULL, '3', '2024-07-29 02:07:41', '2024-07-29 02:07:41'),
(21, NULL, '3', '2024-07-29 02:09:00', '2024-07-29 02:09:00'),
(22, NULL, '3', '2024-07-29 02:10:34', '2024-07-29 02:10:34'),
(23, NULL, '3', '2024-07-29 02:33:07', '2024-07-29 02:33:07'),
(24, NULL, '3', '2024-07-29 02:33:36', '2024-07-29 02:33:36'),
(25, NULL, '1', '2024-07-29 12:12:08', '2024-07-29 12:12:08'),
(26, NULL, '1', '2024-07-29 12:19:00', '2024-07-29 12:19:00'),
(27, NULL, '3', '2024-07-29 12:20:03', '2024-07-29 12:20:03'),
(28, NULL, '1', '2024-07-29 12:21:29', '2024-07-29 12:21:29'),
(29, NULL, '4', '2024-07-29 13:09:25', '2024-07-29 13:09:25'),
(30, NULL, '3', '2024-07-29 14:07:47', '2024-07-29 14:07:47'),
(31, NULL, '2', '2024-07-29 20:18:02', '2024-07-29 20:18:02');

-- --------------------------------------------------------

--
-- Table structure for table `productionorderdetail`
--

CREATE TABLE `productionorderdetail` (
  `pdod_id` int(11) NOT NULL,
  `qty` int(11) DEFAULT NULL,
  `status` varchar(1) DEFAULT NULL,
  `pdo_id` int(11) NOT NULL,
  `pd_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `deleted_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `productionorderdetail`
--

INSERT INTO `productionorderdetail` (`pdod_id`, `qty`, `status`, `pdo_id`, `pd_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 10, '3', 1, 1, '2024-07-28 01:36:45', '2024-07-28 01:36:45', NULL),
(2, 10, '3', 2, 1, '2024-07-28 01:42:10', '2024-07-28 01:42:10', NULL),
(3, 2, '2', 3, 2, '2024-07-28 01:50:19', '2024-07-28 01:50:19', NULL),
(4, 10, '2', 4, 1, '2024-07-28 02:01:16', '2024-07-28 02:01:16', NULL),
(5, 10, '2', 5, 2, '2024-07-28 02:02:12', '2024-07-28 02:02:12', NULL),
(6, 10, '2', 6, 1, '2024-07-29 00:03:41', '2024-07-29 00:03:41', NULL),
(7, 1, '2', 7, 1, '2024-07-29 00:17:13', '2024-07-29 00:17:13', NULL),
(8, 1, '2', 7, 2, '2024-07-29 00:17:13', '2024-07-29 00:17:13', NULL),
(9, 1, '2', 8, 1, '2024-07-29 00:21:23', '2024-07-29 00:21:23', NULL),
(10, 1, '1', 9, 1, '2024-07-29 00:30:14', '2024-07-29 00:30:14', NULL),
(11, 1, '1', 10, 1, '2024-07-29 00:32:30', '2024-07-29 00:32:30', NULL),
(12, 1, '1', 10, 2, '2024-07-29 00:32:30', '2024-07-29 00:32:30', NULL),
(13, 1, NULL, 11, 1, '2024-07-29 00:36:24', '2024-07-29 00:36:24', NULL),
(14, 1, NULL, 11, 2, '2024-07-29 00:36:24', '2024-07-29 00:36:24', NULL),
(15, 1, '[', 12, 1, '2024-07-29 00:36:59', '2024-07-29 00:36:59', NULL),
(16, 1, '[', 12, 2, '2024-07-29 00:36:59', '2024-07-29 00:36:59', NULL),
(17, 1, '[', 13, 1, '2024-07-29 00:37:57', '2024-07-29 00:37:57', NULL),
(18, 1, '3', 14, 1, '2024-07-29 00:38:51', '2024-07-29 00:38:51', NULL),
(19, 1, '2', 15, 1, '2024-07-29 00:39:31', '2024-07-29 00:39:31', NULL),
(20, 1, '3', 16, 1, '2024-07-29 01:10:56', '2024-07-29 01:10:56', NULL),
(21, 1, '3', 16, 2, '2024-07-29 01:10:56', '2024-07-29 01:10:56', NULL),
(22, 1, '3', 17, 1, '2024-07-29 01:31:17', '2024-07-29 01:31:17', NULL),
(23, 1, '3', 17, 2, '2024-07-29 01:31:17', '2024-07-29 01:31:17', NULL),
(24, 1, '3', 18, 1, '2024-07-29 01:42:26', '2024-07-29 01:42:26', NULL),
(25, 1, '3', 19, 1, '2024-07-29 01:43:32', '2024-07-29 01:43:32', NULL),
(26, 1, '3', 19, 2, '2024-07-29 01:43:32', '2024-07-29 01:43:32', NULL),
(27, 1, '3', 20, 1, '2024-07-29 02:07:41', '2024-07-29 02:07:41', NULL),
(28, 1, '3', 20, 2, '2024-07-29 02:07:41', '2024-07-29 02:07:41', NULL),
(29, 1, '3', 21, 1, '2024-07-29 02:09:00', '2024-07-29 02:09:00', NULL),
(30, 1, '3', 21, 2, '2024-07-29 02:09:00', '2024-07-29 02:09:00', NULL),
(31, 1, '3', 22, 1, '2024-07-29 02:10:34', '2024-07-29 02:10:34', NULL),
(32, 1, '3', 22, 2, '2024-07-29 02:10:34', '2024-07-29 02:10:34', NULL),
(33, 1, '3', 23, 1, '2024-07-29 02:33:07', '2024-07-29 02:33:07', NULL),
(34, 1, '3', 23, 2, '2024-07-29 02:33:07', '2024-07-29 02:33:07', NULL),
(35, 1, '3', 24, 1, '2024-07-29 02:33:36', '2024-07-29 02:33:36', NULL),
(36, 1, '3', 24, 2, '2024-07-29 02:33:36', '2024-07-29 02:33:36', NULL),
(37, 1, '1', 26, 1, '2024-07-29 12:19:00', '2024-07-29 12:19:00', NULL),
(38, 1, '1', 26, 2, '2024-07-29 12:19:00', '2024-07-29 12:19:00', NULL),
(39, 1, '3', 27, 1, '2024-07-29 12:20:03', '2024-07-29 12:20:03', NULL),
(40, 1, '3', 27, 2, '2024-07-29 12:20:03', '2024-07-29 12:20:03', NULL),
(41, 1, '1', 28, 1, '2024-07-29 12:21:29', '2024-07-29 12:21:29', NULL),
(42, 1, '1', 28, 2, '2024-07-29 12:21:29', '2024-07-29 12:21:29', NULL),
(43, 10, '3', 29, 2, '2024-07-29 13:09:25', '2024-07-29 13:09:25', NULL),
(44, 1, '3', 30, 1, '2024-07-29 14:07:47', '2024-07-29 14:07:47', NULL),
(45, 1, '3', 30, 2, '2024-07-29 14:07:47', '2024-07-29 14:07:47', NULL),
(46, 1, '2', 31, 1, '2024-07-29 20:18:02', '2024-07-29 20:18:02', NULL),
(47, 1, '2', 31, 2, '2024-07-29 20:18:02', '2024-07-29 20:18:02', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `pd_id` int(11) NOT NULL,
  `pd_name` varchar(255) DEFAULT NULL,
  `pd_qtyminimum` int(11) DEFAULT NULL,
  `picture` text DEFAULT NULL,
  `pdc_id` int(11) NOT NULL,
  `status` varchar(1) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`pd_id`, `pd_name`, `pd_qtyminimum`, `picture`, `pdc_id`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Original', 5, NULL, 1, 'A', '2024-07-28 01:35:12', '2024-07-28 01:35:12'),
(2, 'ใบเตย', 5, NULL, 1, 'A', '2024-07-28 01:49:54', '2024-07-28 01:49:54'),
(3, 'เรดเวลเวท', 10, '/images/1722666406017_Screenshot 2023-08-18 183623.png', 1, 'A', '2024-08-03 13:27:22', '2024-08-03 13:27:22'),
(4, 'ออริจินอล', 10, '/images/logo.svg', 1, 'A', '2024-08-03 13:35:39', '2024-08-03 13:35:39'),
(9, 'ดิปใบเตย', 20, '/images/1722701245383_7A0C7EC4-254B-4452-910C-68B1A3BA2897 - Pimnapa Sriboonreuang.jpeg', 2, 'A', '2024-08-03 23:07:40', '2024-08-03 23:07:40'),
(10, 'ดิปส้ม', 10, '/images/1722701914740_image - Kamonwan Homsombat.jpg', 2, 'A', '2024-08-03 23:18:50', '2024-08-03 23:18:50'),
(11, 'ดิปนมสด', 100, '/images/1722702794890_16969315344116962106641699859122 - Patcharapon Kaewyong.jpg', 2, 'A', '2024-08-03 23:33:30', '2024-08-03 23:33:30');

-- --------------------------------------------------------

--
-- Table structure for table `recipe`
--

CREATE TABLE `recipe` (
  `rc_id` int(11) NOT NULL,
  `qtylifetime` int(11) DEFAULT NULL,
  `produced_qty` int(11) DEFAULT NULL,
  `pd_id` int(11) NOT NULL,
  `un_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `recipe`
--

INSERT INTO `recipe` (`rc_id`, `qtylifetime`, `produced_qty`, `pd_id`, `un_id`) VALUES
(1, 10, 5, 1, 7),
(2, 10, 10, 2, 7),
(3, 10, 10, 3, 7),
(4, 10, 5, 4, 7),
(9, 10, 5, 9, 7),
(10, 122, 12, 10, 7),
(11, 150, 10, 11, 7);

-- --------------------------------------------------------

--
-- Table structure for table `recipedetail`
--

CREATE TABLE `recipedetail` (
  `rcd_id` int(11) NOT NULL,
  `ingredients_qty` float DEFAULT NULL,
  `rc_id` int(11) NOT NULL,
  `un_id` int(11) NOT NULL,
  `ind_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `deleted_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `recipedetail`
--

INSERT INTO `recipedetail` (`rcd_id`, `ingredients_qty`, `rc_id`, `un_id`, `ind_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 100, 1, 1, 1, '2024-07-28 01:35:12', '2024-07-28 01:35:12', NULL),
(2, 1, 1, 4, 2, '2024-07-28 01:35:12', '2024-07-28 01:35:12', NULL),
(3, 100, 1, 1, 3, '2024-07-28 01:35:12', '2024-07-28 01:35:12', NULL),
(4, 250, 2, 1, 1, '2024-07-28 01:49:54', '2024-07-28 01:49:54', NULL),
(5, 2, 2, 4, 2, '2024-07-28 01:49:54', '2024-07-28 01:49:54', NULL),
(6, 250, 2, 1, 3, '2024-07-28 01:49:54', '2024-07-28 01:49:54', NULL),
(7, 250, 3, 1, 1, '2024-08-03 13:27:22', '2024-08-03 13:27:22', NULL),
(8, 250, 3, 1, 3, '2024-08-03 13:27:22', '2024-08-03 13:27:22', NULL),
(9, 250, 4, 1, 1, '2024-08-03 13:35:39', '2024-08-03 13:35:39', NULL),
(10, 250, 4, 1, 3, '2024-08-03 13:35:39', '2024-08-03 13:35:39', NULL),
(16, 11, 9, 5, 3, '2024-08-03 23:07:40', '2024-08-03 23:07:40', NULL),
(17, 12, 10, 4, 3, '2024-08-03 23:18:50', '2024-08-03 23:18:50', NULL),
(18, 12, 11, 2, 3, '2024-08-03 23:33:30', '2024-08-03 23:33:30', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `salesmenu`
--

CREATE TABLE `salesmenu` (
  `sm_id` int(11) NOT NULL,
  `sm_name` varchar(255) NOT NULL,
  `smt_id` int(11) NOT NULL,
  `sm_price` float DEFAULT NULL,
  `status` varchar(1) DEFAULT NULL,
  `fix` varchar(1) DEFAULT NULL,
  `picture` text DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `salesmenu`
--

INSERT INTO `salesmenu` (`sm_id`, `sm_name`, `smt_id`, `sm_price`, `status`, `fix`, `picture`, `created_at`, `updated_at`) VALUES
(7, 'ชุดสุดคุ้มมาก', 1, 50, 'o', '1', '/images/logo.svg', '2024-08-03 16:51:48', '2024-08-05 09:24:02'),
(23, 'วันโสดแห่งชาติ', 8, 10, 'c', '2', '/images/1722701245383_7A0C7EC4-254B-4452-910C-68B1A3BA2897 - Pimnapa Sriboonreuang.jpeg', '2024-08-03 23:19:16', '2024-08-05 09:24:24'),
(24, 'วันแม่แห่งชาติ', 9, 200, 'c', '2', '/images/1722701914740_image - Kamonwan Homsombat.jpg', '2024-08-03 23:34:01', '2024-08-05 07:49:53'),
(25, 'เดือนวันแม่', 7, 100, 'c', '2', '/images/1722666406017_Screenshot 2023-08-18 183623.png', '2024-08-05 01:50:35', '2024-08-05 01:50:35'),
(26, 'เนยชอบกินมาก', 8, 1, 'c', '2', '/images/1722701914740_image - Kamonwan Homsombat.jpg', '2024-08-05 02:06:22', '2024-08-05 08:11:59'),
(27, 'เส้นใหญ่ผัดซีอิ๊ว', 1, 5, 'c', '2', '/images/logo.svg', '2024-08-05 02:08:12', '2024-08-05 02:08:12'),
(28, 'วันที่ฝนตกหนัก', 1, 99, 'c', '1', '/images/logo.svg', '2024-08-05 02:13:20', '2024-08-05 02:13:20'),
(29, 'ลดหนักๆ จัดเต็มๆ', 9, 1, 'c', '2', '/images/1722702794890_16969315344116962106641699859122 - Patcharapon Kaewyong.jpg', '2024-08-05 02:13:50', '2024-08-05 02:13:50'),
(30, 'จัดมาสิค้าบฟู', 1, 110, 'c', '1', '/images/1722810021334_rose.png', '2024-08-05 02:24:36', '2024-08-05 05:23:21');

-- --------------------------------------------------------

--
-- Table structure for table `salesmenudetail`
--

CREATE TABLE `salesmenudetail` (
  `smde_id` int(11) NOT NULL,
  `sm_id` int(11) NOT NULL,
  `pd_id` int(11) NOT NULL,
  `qty` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `deleted_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `salesmenudetail`
--

INSERT INTO `salesmenudetail` (`smde_id`, `sm_id`, `pd_id`, `qty`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 7, 2, 2, '2024-08-03 16:51:48', '2024-08-03 16:51:48', NULL),
(2, 7, 3, 1, '2024-08-03 16:51:48', '2024-08-03 16:51:48', NULL),
(3, 7, 4, 1, '2024-08-03 16:51:48', '2024-08-03 16:51:48', NULL),
(9, 23, 11, NULL, '2024-08-03 23:19:16', '2024-08-03 23:19:16', NULL),
(10, 24, 10, NULL, '2024-08-03 23:34:01', '2024-08-03 23:34:01', NULL),
(11, 25, 3, NULL, '2024-08-05 01:50:36', '2024-08-05 01:50:36', NULL),
(12, 26, 9, NULL, '2024-08-05 02:06:22', '2024-08-05 02:06:22', NULL),
(13, 27, 4, 4, '2024-08-05 02:08:12', '2024-08-05 02:08:12', NULL),
(14, 28, 4, 4, '2024-08-05 02:13:20', '2024-08-05 02:13:20', NULL),
(15, 29, 11, NULL, '2024-08-05 02:13:50', '2024-08-05 02:13:50', NULL),
(16, 30, 1, 1, '2024-08-05 02:24:36', '2024-08-05 02:24:36', NULL),
(17, 30, 2, 2, '2024-08-05 02:24:36', '2024-08-05 02:24:36', NULL),
(18, 30, 3, 1, '2024-08-05 02:24:36', '2024-08-05 02:24:36', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `salesmenutype`
--

CREATE TABLE `salesmenutype` (
  `smt_id` int(11) NOT NULL,
  `smt_name` varchar(255) NOT NULL,
  `un_id` int(11) NOT NULL,
  `qty_per_unit` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `salesmenutype`
--

INSERT INTO `salesmenutype` (`smt_id`, `smt_name`, `un_id`, `qty_per_unit`, `created_at`, `updated_at`) VALUES
(1, 'กล่อง M', 7, 4, '2024-07-28 01:32:17', '2024-07-28 01:32:17'),
(2, 'กล่อง L', 7, 6, '2024-07-28 01:32:36', '2024-07-28 01:32:36'),
(7, 'ดิปเก่า', 7, 1, '2024-08-03 23:07:00', '2024-08-03 23:07:00'),
(8, 'ดิปใหม่', 7, 1, '2024-08-03 23:18:06', '2024-08-03 23:18:06'),
(9, 'ดิปที่ใหม่กว่า', 7, 1, '2024-08-03 23:32:45', '2024-08-03 23:32:45'),
(10, 'น้ำตาลทางมะพร้าว', 5, 1, '2024-08-06 05:12:16', '2024-08-06 05:12:16');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('01staff.js'),
('02unit.js'),
('03ingredient.js'),
('04ingredient_lot.js'),
('05ingredient_lot_detail.js'),
('06productCategory.js'),
('07products.js'),
('08recipe.js'),
('09recipedetail.js'),
('10salesMenuType.js'),
('11salesMenu.js'),
('12salesMenudetail.js'),
('13productionOrder.js'),
('14productionOrderdetail.js'),
('15Ingredient_Used_Pro.js'),
('16Ingredient_Used.js'),
('17ingredient_Used_detail.js'),
('18expensesType.js'),
('19expenses.js');

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `st_id` int(11) NOT NULL,
  `st_username` varchar(255) DEFAULT NULL,
  `st_password` varchar(255) DEFAULT NULL,
  `st_name` varchar(255) DEFAULT NULL,
  `st_tel` varchar(10) DEFAULT NULL,
  `st_start` datetime DEFAULT NULL,
  `st_end` datetime DEFAULT NULL,
  `st_type` varchar(1) DEFAULT NULL,
  `st_status` varchar(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`st_id`, `st_username`, `st_password`, `st_name`, `st_tel`, `st_start`, `st_end`, `st_type`, `st_status`) VALUES
(1, 'eyefu', '$2b$10$UCetuN1rUZmY0XzVc1o0MuDk8xIHrmSuI8EyVTkre4NaKr/MU/fqa', 'อายฟูฟู', '09999999', '2024-07-26 00:00:00', NULL, '1', '1');

-- --------------------------------------------------------

--
-- Table structure for table `unit`
--

CREATE TABLE `unit` (
  `un_id` int(11) NOT NULL,
  `un_name` varchar(255) NOT NULL,
  `type` varchar(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `unit`
--

INSERT INTO `unit` (`un_id`, `un_name`, `type`) VALUES
(1, 'กรัม', '1'),
(2, 'กิโลกรัม', '1'),
(3, 'แกลลอน', '1'),
(4, 'ลิตร', '1'),
(5, 'ถุง', '1'),
(6, 'มิลลิกรัม', '1'),
(7, 'กล่อง', '1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `expenses`
--
ALTER TABLE `expenses`
  ADD PRIMARY KEY (`ep_id`),
  ADD KEY `ept_id` (`ept_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `expensestype`
--
ALTER TABLE `expensestype`
  ADD PRIMARY KEY (`ept_id`);

--
-- Indexes for table `ingredient`
--
ALTER TABLE `ingredient`
  ADD PRIMARY KEY (`ind_id`),
  ADD KEY `un_purchased` (`un_purchased`),
  ADD KEY `un_ind` (`un_ind`);

--
-- Indexes for table `ingredient_lot`
--
ALTER TABLE `ingredient_lot`
  ADD PRIMARY KEY (`indl_id`);

--
-- Indexes for table `ingredient_lot_detail`
--
ALTER TABLE `ingredient_lot_detail`
  ADD PRIMARY KEY (`indlde_id`),
  ADD KEY `ind_id` (`ind_id`),
  ADD KEY `indl_id` (`indl_id`);

--
-- Indexes for table `ingredient_used`
--
ALTER TABLE `ingredient_used`
  ADD PRIMARY KEY (`indU_id`);

--
-- Indexes for table `ingredient_used_detail`
--
ALTER TABLE `ingredient_used_detail`
  ADD PRIMARY KEY (`indUd_id`),
  ADD KEY `indU_id` (`indU_id`),
  ADD KEY `indlde_id` (`indlde_id`);

--
-- Indexes for table `ingredient_used_pro`
--
ALTER TABLE `ingredient_used_pro`
  ADD PRIMARY KEY (`induP_id`),
  ADD KEY `pdod_id` (`pdod_id`),
  ADD KEY `indlde_id` (`indlde_id`);

--
-- Indexes for table `productcategory`
--
ALTER TABLE `productcategory`
  ADD PRIMARY KEY (`pdc_id`);

--
-- Indexes for table `productionorder`
--
ALTER TABLE `productionorder`
  ADD PRIMARY KEY (`pdo_id`);

--
-- Indexes for table `productionorderdetail`
--
ALTER TABLE `productionorderdetail`
  ADD PRIMARY KEY (`pdod_id`),
  ADD KEY `pdo_id` (`pdo_id`),
  ADD KEY `pd_id` (`pd_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`pd_id`),
  ADD KEY `pdc_id` (`pdc_id`);

--
-- Indexes for table `recipe`
--
ALTER TABLE `recipe`
  ADD PRIMARY KEY (`rc_id`),
  ADD UNIQUE KEY `pd_id` (`pd_id`),
  ADD KEY `un_id` (`un_id`);

--
-- Indexes for table `recipedetail`
--
ALTER TABLE `recipedetail`
  ADD PRIMARY KEY (`rcd_id`),
  ADD KEY `rc_id` (`rc_id`),
  ADD KEY `un_id` (`un_id`),
  ADD KEY `ind_id` (`ind_id`);

--
-- Indexes for table `salesmenu`
--
ALTER TABLE `salesmenu`
  ADD PRIMARY KEY (`sm_id`),
  ADD KEY `smt_id` (`smt_id`);

--
-- Indexes for table `salesmenudetail`
--
ALTER TABLE `salesmenudetail`
  ADD PRIMARY KEY (`smde_id`),
  ADD KEY `sm_id` (`sm_id`),
  ADD KEY `pd_id` (`pd_id`);

--
-- Indexes for table `salesmenutype`
--
ALTER TABLE `salesmenutype`
  ADD PRIMARY KEY (`smt_id`),
  ADD KEY `un_id` (`un_id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`st_id`);

--
-- Indexes for table `unit`
--
ALTER TABLE `unit`
  ADD PRIMARY KEY (`un_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `expenses`
--
ALTER TABLE `expenses`
  MODIFY `ep_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `expensestype`
--
ALTER TABLE `expensestype`
  MODIFY `ept_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ingredient`
--
ALTER TABLE `ingredient`
  MODIFY `ind_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `ingredient_lot`
--
ALTER TABLE `ingredient_lot`
  MODIFY `indl_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ingredient_lot_detail`
--
ALTER TABLE `ingredient_lot_detail`
  MODIFY `indlde_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `ingredient_used`
--
ALTER TABLE `ingredient_used`
  MODIFY `indU_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ingredient_used_detail`
--
ALTER TABLE `ingredient_used_detail`
  MODIFY `indUd_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `ingredient_used_pro`
--
ALTER TABLE `ingredient_used_pro`
  MODIFY `induP_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `productcategory`
--
ALTER TABLE `productcategory`
  MODIFY `pdc_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `productionorder`
--
ALTER TABLE `productionorder`
  MODIFY `pdo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `productionorderdetail`
--
ALTER TABLE `productionorderdetail`
  MODIFY `pdod_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `pd_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `recipe`
--
ALTER TABLE `recipe`
  MODIFY `rc_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `recipedetail`
--
ALTER TABLE `recipedetail`
  MODIFY `rcd_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `salesmenu`
--
ALTER TABLE `salesmenu`
  MODIFY `sm_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `salesmenudetail`
--
ALTER TABLE `salesmenudetail`
  MODIFY `smde_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `salesmenutype`
--
ALTER TABLE `salesmenutype`
  MODIFY `smt_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `st_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `unit`
--
ALTER TABLE `unit`
  MODIFY `un_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `expenses`
--
ALTER TABLE `expenses`
  ADD CONSTRAINT `expenses_ibfk_1` FOREIGN KEY (`ept_id`) REFERENCES `expensestype` (`ept_id`),
  ADD CONSTRAINT `expenses_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `staff` (`st_id`);

--
-- Constraints for table `ingredient`
--
ALTER TABLE `ingredient`
  ADD CONSTRAINT `ingredient_ibfk_1` FOREIGN KEY (`un_purchased`) REFERENCES `unit` (`un_id`),
  ADD CONSTRAINT `ingredient_ibfk_2` FOREIGN KEY (`un_ind`) REFERENCES `unit` (`un_id`);

--
-- Constraints for table `ingredient_lot_detail`
--
ALTER TABLE `ingredient_lot_detail`
  ADD CONSTRAINT `ingredient_lot_detail_ibfk_1` FOREIGN KEY (`ind_id`) REFERENCES `ingredient` (`ind_id`),
  ADD CONSTRAINT `ingredient_lot_detail_ibfk_2` FOREIGN KEY (`indl_id`) REFERENCES `ingredient_lot` (`indl_id`);

--
-- Constraints for table `ingredient_used_detail`
--
ALTER TABLE `ingredient_used_detail`
  ADD CONSTRAINT `ingredient_used_detail_ibfk_1` FOREIGN KEY (`indU_id`) REFERENCES `ingredient_used` (`indU_id`),
  ADD CONSTRAINT `ingredient_used_detail_ibfk_2` FOREIGN KEY (`indlde_id`) REFERENCES `ingredient_lot_detail` (`indlde_id`);

--
-- Constraints for table `ingredient_used_pro`
--
ALTER TABLE `ingredient_used_pro`
  ADD CONSTRAINT `ingredient_used_pro_ibfk_1` FOREIGN KEY (`pdod_id`) REFERENCES `productionorderdetail` (`pdod_id`),
  ADD CONSTRAINT `ingredient_used_pro_ibfk_2` FOREIGN KEY (`indlde_id`) REFERENCES `ingredient_lot_detail` (`indlde_id`);

--
-- Constraints for table `productionorderdetail`
--
ALTER TABLE `productionorderdetail`
  ADD CONSTRAINT `productionorderdetail_ibfk_1` FOREIGN KEY (`pdo_id`) REFERENCES `productionorder` (`pdo_id`),
  ADD CONSTRAINT `productionorderdetail_ibfk_2` FOREIGN KEY (`pd_id`) REFERENCES `products` (`pd_id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`pdc_id`) REFERENCES `productcategory` (`pdc_id`);

--
-- Constraints for table `recipe`
--
ALTER TABLE `recipe`
  ADD CONSTRAINT `recipe_ibfk_1` FOREIGN KEY (`pd_id`) REFERENCES `products` (`pd_id`),
  ADD CONSTRAINT `recipe_ibfk_2` FOREIGN KEY (`un_id`) REFERENCES `unit` (`un_id`);

--
-- Constraints for table `recipedetail`
--
ALTER TABLE `recipedetail`
  ADD CONSTRAINT `recipedetail_ibfk_1` FOREIGN KEY (`rc_id`) REFERENCES `recipe` (`rc_id`),
  ADD CONSTRAINT `recipedetail_ibfk_2` FOREIGN KEY (`un_id`) REFERENCES `unit` (`un_id`),
  ADD CONSTRAINT `recipedetail_ibfk_3` FOREIGN KEY (`ind_id`) REFERENCES `ingredient` (`ind_id`);

--
-- Constraints for table `salesmenu`
--
ALTER TABLE `salesmenu`
  ADD CONSTRAINT `salesmenu_ibfk_1` FOREIGN KEY (`smt_id`) REFERENCES `salesmenutype` (`smt_id`);

--
-- Constraints for table `salesmenudetail`
--
ALTER TABLE `salesmenudetail`
  ADD CONSTRAINT `salesmenudetail_ibfk_1` FOREIGN KEY (`sm_id`) REFERENCES `salesmenu` (`sm_id`),
  ADD CONSTRAINT `salesmenudetail_ibfk_2` FOREIGN KEY (`pd_id`) REFERENCES `products` (`pd_id`);

--
-- Constraints for table `salesmenutype`
--
ALTER TABLE `salesmenutype`
  ADD CONSTRAINT `salesmenutype_ibfk_1` FOREIGN KEY (`un_id`) REFERENCES `unit` (`un_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
