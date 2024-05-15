package com.fatec.petong.Entities.Enums;

public enum EtapaAdocao {
    INICIO("Início"),
    VISITA("Visita"),
    DOCUMENTACAO("Documentação"),
    ENTREGA("Entrega");

    private final String descricao;

    EtapaAdocao(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
