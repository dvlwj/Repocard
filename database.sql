CREATE DATABASE `repocard` COLLATE 'utf8_general_ci';
USE repocard;
-- CREATE TABLE `data_user` (
--   `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
--   `username` varchar(50) NOT NULL UNIQUE,
--   `password` varchar(255) NOT NULL,
--   `level` tinyint NOT NULL,
--   `active` tinyint NOT NULL
-- ) ENGINE='InnoDB' COLLATE 'utf8_general_ci';
-- INSERT INTO `data_user` (`username`, `password`, `level` ,`active`) VALUES ('admin', md5('admin'), '1', '1');

create table data_user
(
	id int auto_increment,
	username varchar(50) not null,
	password varchar(255) not null,
	level tinyint not null,
	active tinyint not null,
	UNIQUE (username),
	constraint data_user_pk
		primary key (id)
);

-- create unique index data_user_username_uindex
-- 	on data_user (username);

INSERT INTO `data_user` (`username`, `password`, `level` ,`active`) VALUES ('admin', md5('admin'), '1', '1');

create table data_student
(
	id int auto_increment,
	nama varchar(255) not null,
	kelas varchar(50) not null,
	active tinyint not null,
	constraint data_student_pk
		primary key (id)
);

create table data_nilai
(
	id int auto_increment,
	id_siswa int not null,
	nama_mata_pelajaran varchar(255) not null,
	nilai int not null,
	constraint data_nilai_pk
		primary key (id)
);

