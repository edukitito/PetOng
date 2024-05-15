package com.fatec.petong.Entities;

import jakarta.persistence.*;

@Entity
@Table(name = "ongs")
public class ONGs {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ongid;
    private String nome;
    private String descricao;
    private String email;
    private String telefone;
    private String endereco;
    private String cidade;
    private String estado;
    private String cnpj;
    private String pix;
    private String senha;

    public ONGs() {
    }

    public ONGs(int ongid, String nome, String descricao, String email, String telefone, String endereco, String cidade, String estado, String CNPJ, String pix, String senha) {
        this.ongid = ongid;
        this.nome = nome;
        this.descricao = descricao;
        this.email = email;
        this.telefone = telefone;
        this.endereco = endereco;
        this.cidade = cidade;
        this.estado = estado;
        this.cnpj = CNPJ;
        this.pix = pix;
        this.senha = senha;
    }

    public Integer getOngid() {
        return ongid;
    }

    public void setOngid(Integer id) {
        this.ongid = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String CNPJ) {
        this.cnpj = CNPJ;
    }

    public String getPix() {
        return pix;
    }

    public void setPix(String pix) {
        this.pix = pix;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }
}
