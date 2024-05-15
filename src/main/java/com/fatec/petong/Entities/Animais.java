package com.fatec.petong.Entities;

import jakarta.persistence.*;

@Entity
@Table(name = "animais")
public class Animais {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer animalId;

    private String nome;
    private String raca;
    private String sexo;
    private String descricao;
    private int idade;
    private String tipo;
    private String proprietarioTipo;
    private int proprietarioID;

    public Animais() {
    }

    public Animais(int animalId, String nome, String raca, String sexo, String descricao, int idade, String tipo, String proprietarioTipo, int proprietarioID) {
        this.animalId = animalId;
        this.nome = nome;
        this.raca = raca;
        this.sexo = sexo;
        this.descricao = descricao;
        this.idade = idade;
        this.tipo = tipo;
        this.proprietarioTipo = proprietarioTipo;
        this.proprietarioID = proprietarioID;
    }

    public Integer getAnimalId() {
        return animalId;
    }

    public void setAnimalId(Integer id) {
        this.animalId = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getRaca() {
        return raca;
    }

    public void setRaca(String raca) {
        this.raca = raca;
    }

    public String getSexo() {
        return sexo;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public int getIdade() {
        return idade;
    }

    public void setIdade(int idade) {
        this.idade = idade;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getProprietarioTipo() {
        return proprietarioTipo;
    }

    public void setProprietarioTipo(String proprietarioTipo) {
        this.proprietarioTipo = proprietarioTipo;
    }

    public int getProprietarioID() {
        return proprietarioID;
    }

    public void setProprietarioID(int proprietarioId) {
        this.proprietarioID = proprietarioId;
    }
}
