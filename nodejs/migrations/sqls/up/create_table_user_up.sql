CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT , PRIMARY KEY (`id`),
  `email` varchar(50) CHARACTER SET utf8 NOT NULL,
  `password` varchar(200) CHARACTER SET utf8 NOT NULL
)