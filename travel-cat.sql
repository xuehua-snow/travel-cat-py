-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1
-- 生成日期： 2025-12-11 15:29:23
-- 服务器版本： 10.4.32-MariaDB
-- PHP 版本： 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `travel-cat`
--

-- --------------------------------------------------------

--
-- 表的结构 `cities`
--

CREATE TABLE `cities` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `country` varchar(50) NOT NULL,
  `intro` text NOT NULL,
  `homepage_img` varchar(255) NOT NULL,
  `history` text DEFAULT NULL,
  `history_img` varchar(255) DEFAULT NULL,
  `food` text DEFAULT NULL,
  `food_img` varchar(255) DEFAULT NULL,
  `language` text DEFAULT NULL,
  `trend` text DEFAULT NULL,
  `trend_img` varchar(255) DEFAULT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `cities`
--

INSERT INTO `cities` (`id`, `name`, `country`, `intro`, `homepage_img`, `history`, `history_img`, `food`, `food_img`, `language`, `trend`, `trend_img`, `create_at`, `updated_at`) VALUES
(1, 'Toronto', 'Canada', 'Toronto is Canada’s largest city and serves as the nation’s economic and cultural hub. Known for its diversity, safety, strong educational resources, and vibrant arts scene, it is a major destination for international students and newcomers.', '\\static\\img\\city\\Toronto.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-10 16:53:26', '2025-12-10 16:53:26'),
(2, 'Seoul', 'Korea', 'Seoul is South Korea’s center of politics, economy, and technology, known for its fast-paced urban development and advanced public infrastructure. The blend of traditional culture and modern cityscape makes it one of Asia’s most globalized metropolitan areas.', '\\static\\img\\city\\seoul1.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-10 16:54:58', '2025-12-10 16:54:58'),
(3, 'Paris', 'French', 'Paris, the capital of France, is renowned worldwide for its art, fashion, and architectural heritage. With deep cultural roots, numerous museums, and iconic historical landmarks, it stands as one of the world’s most influential destinations for tourism and cultural exchange.', '\\static\\img\\city\\paris.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-10 16:55:36', '2025-12-10 16:55:36');

-- --------------------------------------------------------

--
-- 表的结构 `note`
--

CREATE TABLE `note` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `city` varchar(50) NOT NULL,
  `country` varchar(50) NOT NULL,
  `content` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `update_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `note`
--

INSERT INTO `note` (`id`, `user_id`, `city`, `country`, `content`, `created_at`, `update_at`) VALUES
(1, 5, 'toronto', 'canada', 'Like', '2025-12-10 18:55:35', '2025-12-10 18:55:35'),
(2, 5, 'toronto', 'canada', 'go to the bookstore', '2025-12-10 21:23:49', '2025-12-10 21:23:49'),
(3, 5, 'toronto', 'canada', 'If I have this chance to go to toronto, I would like to visite Sheridan', '2025-12-10 21:49:37', '2025-12-10 21:49:37'),
(4, 5, 'toronto', 'canada', 'Nice', '2025-12-10 21:51:14', '2025-12-10 21:51:14'),
(5, 5, 'toronto', 'canada', 'food:poutine', '2025-12-10 22:03:17', '2025-12-10 22:03:17'),
(6, 4, 'toronto', 'canada', 'I like it\r\n', '2025-12-11 08:07:40', '2025-12-11 08:07:40'),
(7, 5, 'seulo', 'korea', 'good TC show', '2025-12-11 09:23:58', '2025-12-11 09:23:58'),
(9, 5, 'paris', 'england', 'good museum', '2025-12-11 09:27:54', '2025-12-11 09:27:54'),
(10, 5, 'paris', 'england', '塞纳河，巴黎圣母院', '2025-12-11 09:28:31', '2025-12-11 09:28:31');

-- --------------------------------------------------------

--
-- 表的结构 `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `admin`, `created_at`) VALUES
(1, 'admin', 'adminPassword', 1, '2025-12-05 01:14:09'),
(4, 'Neve', 'NevePassword', 0, '0000-00-00 00:00:00'),
(5, 'Skadi', 'SkadiPassword', 0, '0000-00-00 00:00:00'),
(7, 'qiongqiong', 'qiongqiong728', 0, '0000-00-00 00:00:00'),
(9, '筇茕', 'Password', 0, '0000-00-00 00:00:00'),
(10, '123123', '123456789', 0, '0000-00-00 00:00:00'),
(11, 'test', '123', 0, '2025-12-08 13:29:39'),
(12, 'asfaf', '123121', 0, '2025-12-09 11:24:08'),
(13, 'Rsaddf', 'feszefezf', 0, '2025-12-09 11:29:30'),
(14, 'Rikki', '41sdawdASWD', 0, '2025-12-09 12:32:34');

--
-- 转储表的索引
--

--
-- 表的索引 `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `note`
--
ALTER TABLE `note`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `cities`
--
ALTER TABLE `cities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 使用表AUTO_INCREMENT `note`
--
ALTER TABLE `note`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- 使用表AUTO_INCREMENT `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
