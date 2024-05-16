package com.fatec.petong.Entities;

import com.fatec.petong.Entities.Enums.EtapaAdocao;
import com.fatec.petong.Entities.Enums.StatusAdocao;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "adocoes")
public class Adocao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "usuarioId")
    private Usuarios usuario;
    @ManyToOne
    @JoinColumn(name = "animalId")
    private Animais animal;
    @ManyToOne
    @JoinColumn(name = "ongId")
    private ONGs ong;
    private Date dataAdocao;
    @Enumerated(EnumType.STRING)
    private EtapaAdocao etapaAdocao;
    @Enumerated(EnumType.STRING)
    private StatusAdocao statusAdocao;

    public Adocao() {
    }

    public Adocao(Integer id, Usuarios usuario, Animais animal, ONGs ong, Date dataAdocao) {
        this.id = id;
        this.usuario = usuario;
        this.animal = animal;
        this.ong = ong;
        this.dataAdocao = dataAdocao;
    }

    public Adocao(Integer id, Usuarios usuario, Animais animal, ONGs ong, Date dataAdocao, EtapaAdocao etapaAdocao, StatusAdocao statusAdocao) {
        this.id = id;
        this.usuario = usuario;
        this.animal = animal;
        this.ong = ong;
        this.dataAdocao = dataAdocao;
        this.etapaAdocao = etapaAdocao;
        this.statusAdocao = statusAdocao;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Usuarios getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuarios usuario) {
        this.usuario = usuario;
    }

    public Animais getAnimal() {
        return animal;
    }

    public void setAnimal(Animais animal) {
        this.animal = animal;
    }

    public ONGs getOng() {
        return ong;
    }

    public void setOng(ONGs ong) {
        this.ong = ong;
    }

    public Date getDataAdocao() {
        return dataAdocao;
    }

    public void setDataAdocao(Date dataAdocao) {
        this.dataAdocao = dataAdocao;
    }

    public EtapaAdocao getEtapaAdocao() {
        return etapaAdocao;
    }

    public void setEtapaAdocao(EtapaAdocao etapaAdocao) {
        this.etapaAdocao = etapaAdocao;
    }

    public StatusAdocao getStatusAdocao() {
        return statusAdocao;
    }

    public void setStatusAdocao(StatusAdocao statusAdocao) {
        this.statusAdocao = statusAdocao;
    }
}
