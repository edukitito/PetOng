package com.fatec.petong.Repositories;

import com.fatec.petong.Entities.Usuarios;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Usuarios, Integer> {
    Optional<Usuarios> findByEmail(String email);

    @Query(value = "SELECT * FROM usuarios WHERE id = (SELECT MAX(id) FROM usuarios)", nativeQuery = true)
    Usuarios findUltimoUsuarioCadastrado();

    @Query(value = "SELECT * FROM vw_usuarios_ativos o WHERE o.email =:email", nativeQuery = true)
    Optional<Usuarios> findByEmailAtivo(@Param("email") String email);

    @Procedure(procedureName = "sp_CadastrarUsuario")
    void cadastrarUsuario(
            @Param("nome") String nome,
            @Param("email") String email,
            @Param("senha") String senha,
            @Param("telefone") String telefone,
            @Param("cpf") String cpf,
            @Param("endereco") String endereco,
            @Param("cidade") String cidade,
            @Param("estado") String estado,
            @Param("nickname") String nickname);
}
