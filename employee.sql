DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(15)NOT NULL,
last_name VARCHAR (15) NOT NULL,
role_id int,
manager_id int,
PRIMARY KEY(id)
);

CREATE TABLE employee_role (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL(),
department_id int,
PRIMARY KEY(id)
);

CREATE TABLE department (
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR (30),
PRIMARY KEY (id)
);
