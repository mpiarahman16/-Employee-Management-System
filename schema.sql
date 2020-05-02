CREATE DATABASE `schema`;
USE `schema`;

CREATE TABLE `department`(
`id` INT auto_increment KEY NOT NULL,
`name` VARCHAR(30)
);

CREATE TABLE `role` (
`id` INT auto_increment KEY NOT NULL,
`title` VARCHAR(30), 
`salary` DECIMAL,
`department_id` INT
);

CREATE TABLE `employee`(
`id` INT auto_increment KEY NOT NULL,
`first_name` VARCHAR(30),
`last_name` VARCHAR(30),
`role_id` INT,
`manager_id` INT
);
