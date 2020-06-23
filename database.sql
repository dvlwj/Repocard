CREATE DATABASE `repocard` COLLATE 'utf8_general_ci';
USE repocard;

create table data_user
(
	id int auto_increment,
	username varchar(50) not null,
	password varchar(255) not null,
	level tinyint not null,
	active tinyint not null,
	mat_pel tinyint null,
	UNIQUE (username),
	constraint data_user_pk
		primary key (id)
);

INSERT INTO `data_user` (`username`, `password`, `level` ,`active`) VALUES ('admin', md5('admin'), '1', '1');

create table data_student
(
	id int auto_increment,
	nama varchar(255) not null,
	password varchar(255) not null,
	kelas varchar(50) not null,
	active tinyint not null,
	constraint data_student_pk
		primary key (id)
);

create table data_nilai
(
	id int auto_increment,
	id_siswa int not null,
	id_mata_pelajaran int not null,
	nilai1 int not null,
	nilai2 int not null,
	nilai3 int not null,
	nilai4 int not null,
	nilai5 int not null,
	nilai6 int not null,
	nilai7 int not null,
	nilai8 int not null,
	nilai9 int not null,
	nilai10 int not null,
	submitted tinyint not null,
	constraint data_nilai_pk
		primary key (id)
);

