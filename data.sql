CREATE DATABASE IF NOT EXISTS boca_example;
USE boca_example;

CREATE TABLE user (
  id INT PRIMARY KEY AUTO_INCREMENT,
  'name' VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
);

INSERT INTO users (id, name, email) VALUES (1, 'Aluno um', 'aluno@um.com');
INSERT INTO users (id, name, email) VALUES (2, 'Aluno dois', 'aluno@dois.com');
