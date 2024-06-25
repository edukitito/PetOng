USE master;

DROP DATABASE IF EXISTS trabalhofacul;

CREATE DATABASE trabalhofacul;

USE trabalhofacul;

-- Criação das tabelas com coluna 'ativo'
CREATE TABLE usuarios (
    id INT NOT NULL PRIMARY KEY IDENTITY,
    nome VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    senha VARCHAR(255),
    telefone VARCHAR(20) UNIQUE,
    cpf VARCHAR(14) UNIQUE,
    endereco VARCHAR(255),
    cidade VARCHAR(100),
    estado VARCHAR(100),
    nickname VARCHAR(100) UNIQUE,
    ativo BIT DEFAULT 1
);
GO

CREATE TABLE ongs (
    ongid INT NOT NULL PRIMARY KEY IDENTITY,
    nome VARCHAR(255) UNIQUE,
    descricao TEXT,
    email VARCHAR(255) UNIQUE,
    telefone VARCHAR(20) UNIQUE,
    endereco VARCHAR(255),
    cidade VARCHAR(100),
    estado VARCHAR(100),
    cnpj VARCHAR(30) UNIQUE,
    pix VARCHAR(100) UNIQUE,
    senha VARCHAR(255),
    ativo BIT DEFAULT 1
);
GO

CREATE TABLE proprietarios (
    id INT NOT NULL,
    tipo VARCHAR(30) NOT NULL,
    PRIMARY KEY (id, tipo)
);
GO

CREATE TABLE animais (
    animal_id INT NOT NULL PRIMARY KEY IDENTITY,
    nome VARCHAR(100),
    raca VARCHAR(100),
    descricao VARCHAR(MAX),
    idade INT,
    tipo VARCHAR(50),
    sexo VARCHAR(20),
    imagem VARBINARY(MAX),
    proprietario_Tipo VARCHAR(30), -- Indica se o proprietário é um usuário ou uma ONG
    proprietario_Id INT,
    ativo BIT DEFAULT 1,
    CONSTRAINT fk_proprietarios
        FOREIGN KEY (proprietario_Id, proprietario_Tipo)
        REFERENCES proprietarios(id, tipo)
);
GO

CREATE TABLE adocoes (
    id INT NOT NULL PRIMARY KEY IDENTITY,
    usuario_id INT NOT NULL,
    animal_id INT NOT NULL,
    ong_id INT NOT NULL,
    data_adocao DATE NOT NULL,
    etapa_adocao VARCHAR(50),
    status_adocao VARCHAR(40),
    ativo BIT DEFAULT 1,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (animal_id) REFERENCES animais(animal_id),
    FOREIGN KEY (ong_id) REFERENCES ongs(ongid)
);
GO

-- Procedures para cadastrar ONGs e Usuários

CREATE PROCEDURE sp_CadastrarONG
    @nome VARCHAR(255),
    @descricao TEXT,
    @email VARCHAR(255),
    @telefone VARCHAR(20),
    @endereco VARCHAR(255),
    @cidade VARCHAR(100),
    @estado VARCHAR(100),
    @cnpj VARCHAR(30),
    @pix VARCHAR(100),
    @senha VARCHAR(255)
AS
BEGIN
    INSERT INTO ongs (nome, descricao, email, telefone, endereco, cidade, estado, cnpj, pix, senha, ativo)
    VALUES (@nome, @descricao, @email, @telefone, @endereco, @cidade, @estado, @cnpj, @pix, @senha, 1);
END;
GO

CREATE PROCEDURE sp_CadastrarUsuario
    @nome VARCHAR(255),
    @email VARCHAR(255),
    @senha VARCHAR(255),
    @telefone VARCHAR(20),
    @cpf VARCHAR(14),
    @endereco VARCHAR(255),
    @cidade VARCHAR(100),
    @estado VARCHAR(100),
    @nickname VARCHAR(100)
AS
BEGIN
    INSERT INTO usuarios (nome, email, senha, telefone, cpf, endereco, cidade, estado, nickname, ativo)
    VALUES (@nome, @email, @senha, @telefone, @cpf, @endereco, @cidade, @estado, @nickname, 1);
END;
GO

-- Views para acessar apenas entidades ativas
CREATE VIEW vw_usuarios_ativos AS
SELECT * FROM usuarios
WHERE ativo = 1;
GO

CREATE VIEW vw_ongs_ativas AS
SELECT * FROM ongs
WHERE ativo = 1;
GO

CREATE VIEW vw_animais_ativos AS
SELECT * FROM animais
WHERE ativo = 1;
GO

CREATE VIEW vw_adocoes_ativas AS
SELECT * FROM adocoes
WHERE ativo = 1;
GO

-- Triggers para gerenciar a inativação de entidades

CREATE TRIGGER trg_InativarUsuario
ON usuarios
AFTER UPDATE
AS
BEGIN
    IF EXISTS (SELECT 1 FROM inserted WHERE ativo = 0)
    BEGIN
        -- Inativar adoções do usuário
        UPDATE adocoes
        SET ativo = 0, status_adocao = 'CANCELADA'
        WHERE usuario_id IN (SELECT id FROM inserted WHERE ativo = 0) AND status_adocao != 'CONCLUIDA';

        -- Inativar animais do usuário
        UPDATE animais
        SET ativo = 0
        WHERE proprietario_id IN (SELECT id FROM inserted WHERE ativo = 0) AND proprietario_tipo = 'usuario';
    END
END;
GO

-- Trigger para inativar uma ONG ao invés de deletá-la
CREATE TRIGGER trg_InativarONGnaoDELETAR
ON ongs
INSTEAD OF DELETE
AS
BEGIN
    UPDATE ongs
    SET ativo = 0
    WHERE ongid IN (SELECT ongid FROM deleted);

    -- Inativar animais da ONG
    UPDATE animais
    SET ativo = 0
    FROM animais a
    JOIN proprietarios p ON a.proprietario_id = p.id AND a.proprietario_tipo = 'ong'
    WHERE p.id IN (SELECT ongid FROM deleted);

    -- Inativar adoções da ONG
    UPDATE adocoes
    SET ativo = 0, status_adocao = 'CANCELADA'
    WHERE ong_id IN (SELECT ongid FROM deleted) AND status_adocao != 'CONCLUIDA';
END;
GO

-- Trigger para inativar um animal ao invés de deletá-lo
CREATE TRIGGER trg_ExcluirAnimais
ON animais
INSTEAD OF DELETE
AS 
BEGIN
    UPDATE animais
    SET ativo = 0
    WHERE animal_id IN (SELECT animal_id FROM deleted);

    UPDATE adocoes
    SET ativo = 0, status_adocao = 'CANCELADA'
    WHERE animal_id IN (SELECT animal_id FROM deleted) AND status_adocao != 'CONCLUIDA';
END;
GO

-- Trigger para atualizar o proprietário do animal e inativar o animal quando uma adoção é concluída
CREATE TRIGGER trg_AtualizarProprietarioAdocao
ON adocoes
AFTER UPDATE
AS
BEGIN
    IF EXISTS (SELECT 1 FROM inserted WHERE status_adocao = 'CONCLUIDA')
    BEGIN
        UPDATE animais
        SET proprietario_id = i.usuario_id, proprietario_tipo = 'usuario', ativo = 0
        FROM animais a
        JOIN inserted i ON a.animal_id = i.animal_id
        WHERE i.status_adocao = 'CONCLUIDA';
    END
END;
GO

-- Triggers para inserir registros na tabela proprietarios

CREATE TRIGGER trg_InsertProprietarioUsuario
ON usuarios
AFTER INSERT
AS
BEGIN
    INSERT INTO proprietarios (id, tipo)
    SELECT id, 'usuario' FROM inserted;
END;
GO

CREATE TRIGGER trg_InsertProprietarioONG
ON ongs
AFTER INSERT
AS
BEGIN
    INSERT INTO proprietarios (id, tipo)
    SELECT ongid, 'ong' FROM inserted;
END;
GO
