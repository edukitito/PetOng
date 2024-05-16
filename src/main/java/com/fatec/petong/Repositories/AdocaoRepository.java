package com.fatec.petong.Repositories;

import com.fatec.petong.Entities.Adocao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdocaoRepository extends JpaRepository<Adocao, Integer> {
}
