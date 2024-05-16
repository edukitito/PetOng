package com.fatec.petong.Repositories;

import com.fatec.petong.Entities.Animais;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnimalRepository extends JpaRepository<Animais, Integer> {
}
