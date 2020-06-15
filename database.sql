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

