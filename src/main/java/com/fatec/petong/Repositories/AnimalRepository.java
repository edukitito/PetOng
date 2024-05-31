package com.fatec.petong.Repositories;

import com.fatec.petong.Entities.Animais;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnimalRepository extends JpaRepository<Animais, Integer> {
    @Query(value = "EXEC sp_GetAnimaisByCidadeONG @Cidade = :cidade", nativeQuery = true)
    List<Animais> findAnimaisByCidade(@Param("cidade") String cidade);

    List<Animais> findAnimaisByProprietarioIdAndAndProprietarioTipo(Integer ongId, String proprietarioTipo);
}
