package com.fatec.petong.Repositories;

import com.fatec.petong.Entities.Adocao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdocaoRepository extends JpaRepository<Adocao, Integer> {
    List<Adocao> findByUsuarioId(Integer usuarioId);
    List<Adocao> findAdocaoByOng_Ongid(Integer ongId);
}
