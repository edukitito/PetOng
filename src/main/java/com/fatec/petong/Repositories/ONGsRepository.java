package com.fatec.petong.Repositories;

import com.fatec.petong.Entities.ONGs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ONGsRepository extends JpaRepository<ONGs, Integer> {
}
