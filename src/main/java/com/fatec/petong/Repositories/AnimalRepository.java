package com.fatec.petong.Repositories;

import com.fatec.petong.Entities.Animais;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnimalRepository extends JpaRepository<Animais, Integer> {
}
