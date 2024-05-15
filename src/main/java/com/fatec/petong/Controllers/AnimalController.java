package com.fatec.petong.Controllers;

import com.fatec.petong.Entities.Animais;
import com.fatec.petong.Services.AnimalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/animais")
public class AnimalController {

    @Autowired
    AnimalService service;

    @GetMapping
    public ResponseEntity<List<Animais>> getAllAnimais(){
        List<Animais> animais = service.findAll();
        return ResponseEntity.ok().body(animais);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Animais> getAnimalById(@PathVariable Integer id) {
        Optional<Animais> animal = service.findById(id);
        return animal.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Animais> createAnimal(@RequestBody Animais animal) {
        Animais createdAnimal = service.create(animal);
        return new ResponseEntity<>(createdAnimal, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Animais> updateAnimal(@PathVariable Integer id, @RequestBody Animais animalDetails) {
        Animais updatedAnimal = service.update(id, animalDetails);
        if (updatedAnimal != null) {
            return new ResponseEntity<>(updatedAnimal, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnimal(@PathVariable Integer id) {
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
