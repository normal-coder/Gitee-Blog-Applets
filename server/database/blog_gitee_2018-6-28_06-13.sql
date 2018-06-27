# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: localhost (MySQL 5.6.38)
# Database: blog_gitee
# Generation Time: 2018-06-27 22:13:21 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '无序ID',
  `nickname` varchar(255) DEFAULT '' COMMENT '昵称',
  `gender` int(1) DEFAULT NULL COMMENT '性别',
  `language` varchar(32) DEFAULT NULL COMMENT '语言',
  `city` varchar(32) DEFAULT NULL COMMENT '城市',
  `ptovince` varchar(32) DEFAULT NULL COMMENT '省份',
  `country` varchar(32) DEFAULT NULL COMMENT '国家',
  `avatar` varchar(2000) DEFAULT NULL COMMENT '头像',
  `telepone` int(11) DEFAULT NULL COMMENT '手机号码',
  `openid` varchar(255) NOT NULL DEFAULT '' COMMENT 'OpenID',
  `unionid` varchar(255) DEFAULT '' COMMENT 'UNIONID',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '资料更新时间',
  `last_login_time` datetime DEFAULT NULL COMMENT '最后一次登陆时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;