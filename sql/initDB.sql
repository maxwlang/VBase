/*----------------------------------------------
-- RUN `gulp sql` before using this script!!! --
-- Below is meta used for `gulp sql`.         --
------------------------------------------------
-- %%[DB_NAME, DB_USER, DB_USER_PASSWORD, IP_ALLOWED]%% --
----------------------------------------------*/

DROP DATABASE IF EXISTS %%DB_NAME%%;
CREATE DATABASE %%DB_NAME%%;

CREATE USER '%%DB_USER%%'@'%%IP_ALLOWED%%' IDENTIFIED BY '%%DB_USER_PASSWORD%%';
GRANT ALL PRIVILEGES ON %%DB_NAME%% . * TO '%%DB_USER%%'@'%%IP_ALLOWED%%';
FLUSH PRIVILEGES;

USE %%DB_NAME%%;

-- 'sessions' table will be created on application first run.
-- add on to this as-needed
CREATE TABLE accounts (
    id MEDIUMINT NOT NULL AUTO_INCREMENT,
    username varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    firstname varchar(255),
    lastname varchar(255),
    PRIMARY KEY (id)
);
