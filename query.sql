-- --------------------------------------------------------

--
-- Структура таблицы `swan_author`
--

CREATE TABLE `swan_author` (
  `id` int(11) NOT NULL,
  `fio` varchar(255) NOT NULL DEFAULT '',
  `description` text,
  `id_delete` tinyint(4) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Структура таблицы `swan_books`
--

CREATE TABLE `swan_books` (
  `id` int(11) NOT NULL,
  `book_dateis` datetime DEFAULT NULL,
  `author_name` varchar(255) NOT NULL,
  `book_name` varchar(255) NOT NULL DEFAULT '',
  `description` varchar(255) DEFAULT NULL,
  `book_year` smallint(3) NOT NULL DEFAULT '1970',
  `id_delete` tinyint(4) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `rtmistest_swan_books`
--

INSERT INTO `swan_books` (`id`, `book_dateis`, `author_name`, `book_name`, `description`, `book_year`, `id_delete`, `status`) VALUES
(7, NULL, 'Пушкин А.С.', 'Евгений Онегин', NULL, 1833, 0, 1),
(8, NULL, 'Толстой Л.Н.', 'Война и мир', NULL, 1869, 0, 1),
(9, NULL, 'dasd', 'asdasd', NULL, 32767, 0, 1);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `swan_author`
--
ALTER TABLE `rtmistest_swan_author`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `swan_books`
--
ALTER TABLE `swan_books`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `swan_author`
--
ALTER TABLE `swan_author`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `swan_books`
--
ALTER TABLE `swan_books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;
