CREATE DATABASE backend;

USE backend;
CREATE TABLE `cliente` (
  `id` integer NOT NULL AUTO_INCREMENT,
  `cpf` varchar(14) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `sobrenome` varchar(100) NOT NULL,
  `endereco` varchar(100) NOT NULL,
  `cidade` varchar(100) NOT NULL,
  `estado` varchar(2) NOT NULL,
  `cep` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
);

use backend;
CREATE TABLE `fornecedor`(
  `codigo` integer NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `endereco` varchar(100) NOT NULL,
  `bairro` varchar(100) NOT NULL,
  `cidade` varchar(100) NOT NULL,
  `estado` varchar(2) NOT NULL,
  `cep` varchar(10) NOT NULL,
  `ativo` boolean,
  PRIMARY KEY (`codigo`)
);

use backend;
CREATE TABLE `produto`(
  `codigo` integer NOT NULL AUTO_INCREMENT,
  `descricao` varchar(100) NOT NULL,
  `validade` date NOT NULL,
  `preco_custo` decimal(10,2) NOT NULL,
  `preco_venda` decimal(10,2) NOT NULL,
  `estoque` integer NOT NULL,
  `cod_barra` varchar(20) NOT NULL,
  PRIMARY KEY (`codigo`)
);