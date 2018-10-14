CREATE TABLE `books` (
  id int auto_increment primary key NOT NULL,
  isbn varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  openid varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  title varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  author varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  image varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  alt varchar(100) COLLATE utf8mb4_unicode_ci ,
  pubdate varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  rate float,
  summary varchar(1000) COLLATE utf8mb4_unicode_ci ,
  publisher varchar(1000) COLLATE utf8mb4_unicode_ci,
  price varchar(1000) COLLATE utf8mb4_unicode_ci,
  tags varchar(1000) COLLATE utf8mb4_unicode_ci
)
