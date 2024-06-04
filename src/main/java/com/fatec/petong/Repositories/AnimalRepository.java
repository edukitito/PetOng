package com.fatec.petong.Repositories;

import com.fatec.petong.Entities.Animais;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnimalRepository extends JpaRepository<Animais, Integer> {

    @Query(value = "EXEC sp_GetAnimaisByCidadeONG :Cidade", nativeQuery = true)
    List<Animais> findAnimaisByCidade(@Param("Cidade") String cidade);

    @Query(value = "EXEC sp_GetAnimaisByEstadoONG :Estado", nativeQuery = true)
    List<Animais> findAnimaisByEstado(@Param("Estado") String estado);

    @Query(value = "EXEC sp_GetAnimaisByEstadoTipoONG :Estado, :Tipo", nativeQuery = true)
    List<Animais> findAnimaisByEstadoTipo(@Param("Estado") String estado, @Param("Tipo") String tipo);

    @Query(value = "EXEC sp_GetAnimaisByCidadeTipoONG :Cidade, :Tipo", nativeQuery = true)
    List<Animais> findAnimaisByCidadeTipo(@Param("Cidade") String cidade, @Param("Tipo") String tipo);

    @Query("SELECT a FROM Animais a WHERE a.tipo = :tipo")
    List<Animais> findAnimaisByTipo(@Param("tipo") String tipo);

    List<Animais> findAnimaisByProprietarioIdAndAndProprietarioTipo(Integer ongId, String proprietarioTipo);

}
