package com.fatec.petong.Repositories;

import com.fatec.petong.Entities.ONGs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ONGsRepository extends JpaRepository<ONGs, Integer> {
    Optional<ONGs> findByCnpj(String cnpj);

    Optional<ONGs> findByEmail(String email);

    @Query(value = "SELECT * FROM vw_ongs_ativas o WHERE o.cnpj =:cnpj", nativeQuery = true)
    Optional<ONGs> findByCnpjAtivo(@Param("cnpj") String cnpj);
}
