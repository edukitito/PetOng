package com.fatec.petong.Entities;

public class AnimalOngDTO {
    private Integer animalId;
    private String animalNome;
    private String animalRaca;
    private String animalSexo;
    private String animalDescricao;
    private int animalIdade;
    private String animalTipo;
    private byte[] animalImagem;

    private Integer ongId;
    private String ongNome;
    private String ongDescricao;
    private String ongEmail;
    private String ongTelefone;
    private String ongEndereco;
    private String ongCidade;
    private String ongEstado;
    private String ongCnpj;
    private String ongPix;

    public AnimalOngDTO(Integer animalId, String animalNome, String animalRaca, String animalSexo, String animalDescricao, int animalIdade, String animalTipo, byte[] animalImagem, Integer ongId, String ongNome, String ongDescricao, String ongEmail, String ongTelefone, String ongEndereco, String ongCidade, String ongEstado, String ongCnpj, String ongPix) {
        this.animalId = animalId;
        this.animalNome = animalNome;
        this.animalRaca = animalRaca;
        this.animalSexo = animalSexo;
        this.animalDescricao = animalDescricao;
        this.animalIdade = animalIdade;
        this.animalTipo = animalTipo;
        this.animalImagem = animalImagem;
        this.ongId = ongId;
        this.ongNome = ongNome;
        this.ongDescricao = ongDescricao;
        this.ongEmail = ongEmail;
        this.ongTelefone = ongTelefone;
        this.ongEndereco = ongEndereco;
        this.ongCidade = ongCidade;
        this.ongEstado = ongEstado;
        this.ongCnpj = ongCnpj;
        this.ongPix = ongPix;
    }

    public AnimalOngDTO() {
    }

    public Integer getAnimalId() {
        return animalId;
    }

    public void setAnimalId(Integer animalId) {
        this.animalId = animalId;
    }

    public String getAnimalNome() {
        return animalNome;
    }

    public void setAnimalNome(String animalNome) {
        this.animalNome = animalNome;
    }

    public String getAnimalRaca() {
        return animalRaca;
    }

    public void setAnimalRaca(String animalRaca) {
        this.animalRaca = animalRaca;
    }

    public String getAnimalSexo() {
        return animalSexo;
    }

    public void setAnimalSexo(String animalSexo) {
        this.animalSexo = animalSexo;
    }

    public String getAnimalDescricao() {
        return animalDescricao;
    }

    public void setAnimalDescricao(String animalDescricao) {
        this.animalDescricao = animalDescricao;
    }

    public int getAnimalIdade() {
        return animalIdade;
    }

    public void setAnimalIdade(int animalIdade) {
        this.animalIdade = animalIdade;
    }

    public String getAnimalTipo() {
        return animalTipo;
    }

    public void setAnimalTipo(String animalTipo) {
        this.animalTipo = animalTipo;
    }

    public byte[] getAnimalImagem() {
        return animalImagem;
    }

    public void setAnimalImagem(byte[] animalImagem) {
        this.animalImagem = animalImagem;
    }

    public Integer getOngId() {
        return ongId;
    }

    public void setOngId(Integer ongId) {
        this.ongId = ongId;
    }

    public String getOngNome() {
        return ongNome;
    }

    public void setOngNome(String ongNome) {
        this.ongNome = ongNome;
    }

    public String getOngDescricao() {
        return ongDescricao;
    }

    public void setOngDescricao(String ongDescricao) {
        this.ongDescricao = ongDescricao;
    }

    public String getOngEmail() {
        return ongEmail;
    }

    public void setOngEmail(String ongEmail) {
        this.ongEmail = ongEmail;
    }

    public String getOngTelefone() {
        return ongTelefone;
    }

    public void setOngTelefone(String ongTelefone) {
        this.ongTelefone = ongTelefone;
    }

    public String getOngEndereco() {
        return ongEndereco;
    }

    public void setOngEndereco(String ongEndereco) {
        this.ongEndereco = ongEndereco;
    }

    public String getOngCidade() {
        return ongCidade;
    }

    public void setOngCidade(String ongCidade) {
        this.ongCidade = ongCidade;
    }

    public String getOngEstado() {
        return ongEstado;
    }

    public void setOngEstado(String ongEstado) {
        this.ongEstado = ongEstado;
    }

    public String getOngCnpj() {
        return ongCnpj;
    }

    public void setOngCnpj(String ongCnpj) {
        this.ongCnpj = ongCnpj;
    }

    public String getOngPix() {
        return ongPix;
    }

    public void setOngPix(String ongPix) {
        this.ongPix = ongPix;
    }
}
