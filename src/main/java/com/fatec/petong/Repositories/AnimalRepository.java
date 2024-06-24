package com.fatec.petong.Repositories;

import com.fatec.petong.Entities.Animais;
import com.fatec.petong.Entities.AnimalOngDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AnimalRepository extends JpaRepository<Animais, Integer> {

    @Query(value = "SELECT a.animal_id, a.nome, a.raca, a.descricao, a.idade, a.tipo, a.sexo, a.imagem, a.proprietario_Tipo, a.proprietario_Id  FROM animais a inner join ONGs o on a.proprietario_Id=o.ongid where o.cidade = :cidade and a.ativo = 1", nativeQuery = true)
    List<Animais> findAnimaisByCidade(@Param("cidade") String cidade);

    @Query(value = "SELECT a.animal_id, a.nome, a.raca, a.descricao, a.idade, a.tipo, a.sexo, a.imagem, a.proprietario_Tipo, a.proprietario_Id FROM animais a inner join ONGs o on a.proprietario_Id=o.ongid where o.estado = :estado and a.ativo = 1", nativeQuery = true)
    List<Animais> findAnimaisByEstado(@Param("estado") String estado);

    @Query(value = "SELECT a.animal_id, a.nome, a.raca, a.descricao, a.idade, a.tipo, a.sexo, a.imagem, a.proprietario_Tipo, a.proprietario_Id FROM animais a inner join ONGs o on a.proprietario_Id=o.ongid where o.estado = :estado and a.tipo =:tipo and a.ativo = 1", nativeQuery = true)
    List<Animais> findAnimaisByEstadoTipo(@Param("estado") String estado, @Param("tipo") String tipo);

    @Query(value = "SELECT a.animal_id, a.nome, a.raca, a.descricao, a.idade, a.tipo, a.sexo, a.imagem, a.proprietario_Tipo, a.proprietario_Id FROM animais a inner join ONGs o on a.proprietario_Id=o.ongid where o.cidade = :cidade and a.tipo =:tipo and a.ativo = 1", nativeQuery = true)
    List<Animais> findAnimaisByCidadeTipo(@Param("cidade") String cidade, @Param("tipo") String tipo);

    @Query(value = "SELECT a.animal_id, a.nome, a.raca, a.descricao, a.idade, a.tipo, a.sexo, a.imagem, a.proprietario_Tipo, a.proprietario_Id FROM animais a WHERE a.tipo = :tipo and a.ativo = 1", nativeQuery = true)
    List<Animais> findAnimaisByTipo(@Param("tipo") String tipo);

    List<Animais> findAnimaisByProprietarioIdAndAndProprietarioTipo(Integer ongId, String proprietarioTipo);

    @Query(value = "SELECT * FROM vw_animais_ativos", nativeQuery = true)
    List<Animais> findAllAtivos();
}
