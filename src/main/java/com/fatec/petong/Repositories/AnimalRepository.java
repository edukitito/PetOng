package com.fatec.petong.Repositories;

import com.fatec.petong.Entities.Animais;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnimalRepository extends JpaRepository<Animais, Integer> {

    @Query("SELECT a FROM Animais a inner join ONGs o on a.proprietarioId=o.ongid where o.cidade = :cidade")
    List<Animais> findAnimaisByCidade(@Param("cidade") String cidade);

    @Query("SELECT a FROM Animais a inner join ONGs o on a.proprietarioId=o.ongid where o.estado = :estado")
    List<Animais> findAnimaisByEstado(@Param("estado") String estado);

    @Query("SELECT a FROM Animais a inner join ONGs o on a.proprietarioId=o.ongid where o.estado = :estado and a.tipo =:tipo")
    List<Animais> findAnimaisByEstadoTipo(@Param("estado") String estado, @Param("tipo") String tipo);

    @Query("SELECT a FROM Animais a inner join ONGs o on a.proprietarioId=o.ongid where o.cidade = :cidade and a.tipo =:tipo")
    List<Animais> findAnimaisByCidadeTipo(@Param("cidade") String cidade, @Param("tipo") String tipo);

    @Query("SELECT a FROM Animais a WHERE a.tipo = :tipo")
    List<Animais> findAnimaisByTipo(@Param("tipo") String tipo);

    List<Animais> findAnimaisByProprietarioIdAndAndProprietarioTipo(Integer ongId, String proprietarioTipo);

}
