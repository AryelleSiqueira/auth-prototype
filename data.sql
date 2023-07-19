CREATE DATABASE boca-ex;
USE boca-ex;

CREATE TABLE user (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
);

INSERT INTO users (id, name, email) VALUES (1, 'Aluno um', 'aluno@um.com');
INSERT INTO users (id, name, email) VALUES (2, 'Aluno dois', 'aluno@dois.com');
