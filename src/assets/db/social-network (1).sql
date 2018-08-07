-- phpMyAdmin SQL Dump
-- version 4.7.3
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Авг 07 2018 г., 17:52
-- Версия сервера: 5.6.37
-- Версия PHP: 5.5.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `social-network`
--

-- --------------------------------------------------------

--
-- Структура таблицы `comment`
--

CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `from_user_id` int(11) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `user_last_name` varchar(50) NOT NULL,
  `user_image` varchar(100) NOT NULL,
  `user_comment` text NOT NULL,
  `date` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `comment`
--

INSERT INTO `comment` (`id`, `post_id`, `user_id`, `from_user_id`, `user_name`, `user_last_name`, `user_image`, `user_comment`, `date`) VALUES
(203, 341, 38, 39, 'Scarlet ', 'Witch', 'Scarlet.png', 'hi', '2018-07-29T06:56:01.296Z'),
(204, 341, 38, 38, 'Hulk', 'Green', 'hulk.jpg', 'hi', '2018-07-29T06:56:09.061Z'),
(205, 343, 37, 37, 'Tony ', 'Stark', 'toni.jpg', 'аа', '2018-07-29T08:01:50.160Z'),
(206, 344, 37, 39, 'Scarlet ', 'Witch', 'Scarlet.png', 'hi', '2018-07-29T08:20:27.536Z'),
(207, 344, 37, 37, 'Tony ', 'Stark', 'toni.jpg', 'hi', '2018-07-29T08:20:32.562Z'),
(208, 344, 37, 38, 'Hulk', 'Green', 'hulk.jpg', 'hi', '2018-07-29T08:20:49.991Z'),
(209, 344, 37, 37, 'Tony ', 'Stark', 'toni.jpg', 'hi', '2018-07-29T08:21:00.076Z'),
(210, 346, 37, 37, 'Tony ', 'Stark', 'toni.jpg', 'gdfgdfg', '2018-07-29T10:35:26.107Z'),
(211, 346, 37, 38, 'Hulk', 'Green', 'hulk.jpg', 'fgdfg', '2018-07-29T10:35:39.110Z'),
(212, 346, 37, 39, 'Scarlet ', 'Witch', 'Scarlet.png', 'fgdfg', '2018-07-29T10:35:51.952Z');

-- --------------------------------------------------------

--
-- Структура таблицы `message`
--

CREATE TABLE `message` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `room_id` int(11) NOT NULL,
  `text` text NOT NULL,
  `date` varchar(100) NOT NULL,
  `time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `message`
--

INSERT INTO `message` (`id`, `user_id`, `room_id`, `text`, `date`, `time`) VALUES
(747, 37, 64, 'hello', 'Sun Jul 29 2018 09:53:24 GMT+0300 (Беларусь (зима))', '00:00:00'),
(748, 39, 64, 'hi', 'Sun Jul 29 2018 09:55:15 GMT+0300 (Беларусь (зима))', '00:00:00'),
(749, 37, 65, 'hello', 'Sun Jul 29 2018 09:57:04 GMT+0300 (Беларусь (зима))', '00:00:00'),
(750, 38, 65, 'hi', 'Sun Jul 29 2018 09:57:13 GMT+0300 (Беларусь (зима))', '00:00:00'),
(751, 37, 65, 'hi', 'Sun Jul 29 2018 10:06:02 GMT+0300 (Беларусь (зима))', '00:00:00'),
(752, 37, 65, 'hi', 'Sun Jul 29 2018 10:06:15 GMT+0300 (Беларусь (зима))', '00:00:00'),
(753, 37, 66, 'hello', 'Sun Jul 29 2018 11:17:24 GMT+0300 (Беларусь (зима))', '00:00:00'),
(754, 38, 66, 'hello', 'Sun Jul 29 2018 11:17:34 GMT+0300 (Беларусь (зима))', '00:00:00'),
(755, 37, 67, 'hi', 'Sun Jul 29 2018 11:19:13 GMT+0300 (Беларусь (зима))', '00:00:00'),
(756, 39, 67, 'hu', 'Sun Jul 29 2018 11:19:19 GMT+0300 (Беларусь (зима))', '00:00:00'),
(757, 37, 66, 'fsdfd', 'Sun Jul 29 2018 12:20:40 GMT+0300 (Беларусь (зима))', '00:00:00'),
(758, 38, 66, 'fgdgd', 'Sun Jul 29 2018 12:21:04 GMT+0300 (Беларусь (зима))', '00:00:00'),
(759, 37, 68, 'totorr', 'Sun Jul 29 2018 13:31:19 GMT+0300 (Беларусь (зима))', '00:00:00'),
(760, 39, 68, 'ghghg', 'Sun Jul 29 2018 13:32:39 GMT+0300 (Беларусь (зима))', '00:00:00'),
(761, 37, 68, 'gjfdg', 'Sun Jul 29 2018 13:32:43 GMT+0300 (Беларусь (зима))', '00:00:00'),
(762, 37, 69, 'ghreg', 'Sun Jul 29 2018 13:32:53 GMT+0300 (Беларусь (зима))', '00:00:00'),
(763, 38, 69, 'gjgjdfg', 'Sun Jul 29 2018 13:33:05 GMT+0300 (Беларусь (зима))', '00:00:00'),
(764, 37, 69, '<script>alert(\'dsfsd\')</script>', 'Sun Jul 29 2018 13:34:10 GMT+0300 (Беларусь (зима))', '00:00:00');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `mail` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `day` int(11) NOT NULL,
  `manth` varchar(50) NOT NULL,
  `year` int(11) NOT NULL,
  `sity` varchar(20) NOT NULL,
  `country` varchar(50) NOT NULL,
  `img` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `name`, `lastname`, `mail`, `password`, `day`, `manth`, `year`, `sity`, `country`, `img`) VALUES
(37, 'Tony ', 'Stark', 'admin@yandex.ru', 'qqqqq', 0, '', 0, '', '', 'toni.jpg'),
(38, 'Hulk', 'Green', 'admin@yandex.ru', 'wwwww', 0, '', 0, '', '', 'hulk.jpg'),
(39, 'Scarlet ', 'Witch', 'admin@yandex.ru', 'eeeee', 0, '', 0, '', '', 'Scarlet.png'),
(40, 'Steve', 'Rogers', 'admin@yandex.ru', 'rrrrr', 0, '', 0, '', '', 'steve.jpg'),
(41, 'Scarlet ', 'navi', 'admin@yandex.ru', 'yyyyy', 0, '', 0, '', '', 'sc2.jpg'),
(42, 'Scarlet ', 'Miko', 'admin@yandex.ru', 'ttttt', 0, '', 0, '', '', 'sc1.jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `users_images`
--

CREATE TABLE `users_images` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `image` text NOT NULL,
  `comment_image_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users_images`
--

INSERT INTO `users_images` (`id`, `user_id`, `image`, `comment_image_id`) VALUES
(93, 37, 'axowbSAN_Tight-FEM_30.png', 0),
(94, 37, 'ajorxGym-Wallpaper-HD-Pictures.jpg', 0),
(95, 37, 'iqkwkSAN_2017_Gluten-Safe_SALE_1920x600_P1_OPT.png', 0),
(96, 37, 'pauvkSAN_2017_Tight-FEM_Available-Now_1920x600_P1_OPT.png', 0),
(97, 37, 'lxmegSAN_2017_Vision-Support_1920x600_part-1.png', 0),
(98, 37, 'iveqzSAN_Fierce-T-Drive_ALL-NEW_1920x600_P1_OPT.png', 0),
(99, 37, 'suucq362737186429911400.jpg', 0),
(100, 37, 'lojczloss_enegry.jpg', 0),
(101, 37, 'ttzumuscle.jpg', 0),
(102, 37, 'mlults1200.jpg', 0),
(103, 37, 'uwrzcsan_boy.jpg', 0),
(104, 37, 'ggnyp00.jpg', 0),
(105, 37, 'qweeg1.jpg', 0),
(106, 37, 'emdwd1-3.jpg', 0),
(107, 37, 'aacii440.jpg', 0),
(108, 37, 'ydepb469.jpg', 0),
(109, 37, 'vbljddd.jpg', 0),
(110, 37, 'grpfrdoma.jpg', 0),
(111, 37, 'rowtuerw_.jpg', 0),
(112, 37, 'auenpfault.jpg', 0),
(113, 37, 'lwfah1-3.jpg', 0),
(114, 37, 'ohwde1.jpg', 0);

-- --------------------------------------------------------

--
-- Структура таблицы `users_rooms`
--

CREATE TABLE `users_rooms` (
  `id` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `creator` int(11) DEFAULT NULL,
  `creator_status` int(11) NOT NULL DEFAULT '0',
  `participant` int(11) NOT NULL,
  `participant_status` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users_rooms`
--

INSERT INTO `users_rooms` (`id`, `date`, `creator`, `creator_status`, `participant`, `participant_status`) VALUES
(68, '2018-07-29 10:31:04', 37, 0, 39, 0),
(69, '2018-07-29 10:32:48', 37, 0, 38, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `user_posts`
--

CREATE TABLE `user_posts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `from_user_id` int(11) NOT NULL,
  `post_text` text NOT NULL,
  `image` varchar(100) NOT NULL,
  `date` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `user_posts`
--

INSERT INTO `user_posts` (`id`, `user_id`, `from_user_id`, `post_text`, `image`, `date`) VALUES
(340, 37, 37, 'hello', 'xoodtSAN_BCAA-Boosted_40serv_Frt-Pnch_Ver1_FV_reflect_600x600.png', 'Sun Jul 29 2018 09:51:31 GMT+0300 (Беларусь (зима))'),
(341, 38, 38, 'hello', 'sabgvSAN_Amino-Acid-5000_300ct_ver1_FV_reflect_600x600-1.png', 'Sun Jul 29 2018 09:51:47 GMT+0300 (Беларусь (зима))'),
(342, 37, 37, '', 'jgrus469.jpg', 'Sun Jul 29 2018 10:47:34 GMT+0300 (Беларусь (зима))'),
(343, 37, 37, '', 'thxyufault.jpg', 'Sun Jul 29 2018 10:48:45 GMT+0300 (Беларусь (зима))'),
(344, 37, 37, '', 'ufnny469.jpg', 'Sun Jul 29 2018 11:19:56 GMT+0300 (Беларусь (зима))'),
(345, 37, 37, 'gjdfgjsdg', 'bsppw1-3.jpg', 'Sun Jul 29 2018 13:34:35 GMT+0300 (Беларусь (зима))'),
(346, 37, 37, 'gjdfgjsdg', 'xegsf00.jpg', 'Sun Jul 29 2018 13:35:13 GMT+0300 (Беларусь (зима))'),
(347, 37, 39, 'ffjsdkjfsdkf', 'fhzrkfault.jpg', 'Sun Jul 29 2018 13:36:10 GMT+0300 (Беларусь (зима))');

-- --------------------------------------------------------

--
-- Структура таблицы `usrs_friends`
--

CREATE TABLE `usrs_friends` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `friends_id` int(11) NOT NULL,
  `friends_name` varchar(50) NOT NULL,
  `friends_lastname` varchar(50) NOT NULL,
  `friends_img` varchar(50) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `usrs_friends`
--

INSERT INTO `usrs_friends` (`id`, `user_id`, `friends_id`, `friends_name`, `friends_lastname`, `friends_img`, `status`) VALUES
(672, 37, 38, 'Hulk', 'Green', 'hulk.jpg', 2),
(673, 38, 37, 'Tony ', 'Stark', 'toni.jpg', 2),
(674, 39, 37, 'Tony ', 'Stark', 'toni.jpg', 2),
(675, 37, 39, 'Scarlet ', 'Witch', 'Scarlet.png', 2);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users_images`
--
ALTER TABLE `users_images`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users_rooms`
--
ALTER TABLE `users_rooms`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `user_posts`
--
ALTER TABLE `user_posts`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `usrs_friends`
--
ALTER TABLE `usrs_friends`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=213;
--
-- AUTO_INCREMENT для таблицы `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=765;
--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;
--
-- AUTO_INCREMENT для таблицы `users_images`
--
ALTER TABLE `users_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=115;
--
-- AUTO_INCREMENT для таблицы `users_rooms`
--
ALTER TABLE `users_rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;
--
-- AUTO_INCREMENT для таблицы `user_posts`
--
ALTER TABLE `user_posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=348;
--
-- AUTO_INCREMENT для таблицы `usrs_friends`
--
ALTER TABLE `usrs_friends`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=676;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
