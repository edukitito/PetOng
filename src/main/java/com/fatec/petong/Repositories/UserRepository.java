package com.fatec.petong.Repositories;

import com.fatec.petong.Entities.Usuarios;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Usuarios, Integer> {
}
