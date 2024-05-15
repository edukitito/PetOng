package com.fatec.petong.Entities.Enums;

public enum StatusAdocao {
    PENDENTE("Pendente"),
    CONCLUIDA("Concluída"),
    CANCELADA("Cancelada");

    private final String descricao;

    StatusAdocao(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
