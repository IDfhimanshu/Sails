/*
    This file is responsible for all mysql database queries
 */
/*
date - July9,2016
purpose - for creating user table
*/
CREATE TABLE `Travel`.`users` (
  `id` INT NOT NULL,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(100) NULL,
  `auth_token` VARCHAR(100) NOT NULL,
  `username` VARCHAR(100) NOT NULL,
  `verify_code` VARCHAR(45) NULL,
  `verified` VARCHAR(45) NULL DEFAULT 0,
  `platform` VARCHAR(45) NULL DEFAULT 'web',
  `date_added` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `date_modified` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC));

  /*Add singup  method for*/
  ALTER TABLE `Travel`.`users`
  ADD COLUMN `signup_method` VARCHAR(45) NULL DEFAULT NULL AFTER `platform`;
