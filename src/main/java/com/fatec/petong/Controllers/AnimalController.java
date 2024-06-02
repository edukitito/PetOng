package com.fatec.petong.Controllers;

import com.fatec.petong.Entities.Animais;
import com.fatec.petong.Entities.ONGs;
import com.fatec.petong.Services.AnimalService;
import com.fatec.petong.Services.ONGService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/animais")
public class AnimalController {

    @Autowired
    AnimalService service;

    @Autowired
    ONGService serviceOng;


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

    @GetMapping("/A/{cnpj}")
    public ResponseEntity<List<Animais>> getAnimalByCnpj(@PathVariable String cnpj) {
        Optional<ONGs> ong = serviceOng.findByCnpj(cnpj);

        if (ong.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        List<Animais> animais = service.findByOng(ong.get().getOngid(), "ong");

        if (animais.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return ResponseEntity.ok(animais);
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<Animais>> searchAnimals(
            @RequestParam(value = "tipo", required = false) String tipo,
            @RequestParam(value = "cidade", required = false) String cidade,
            @RequestParam(value = "estado", required = false) String estado) {
        List<Animais> animais = service.searchAnimals(tipo, cidade, estado);
        return ResponseEntity.ok(animais);
    }


    @PostMapping("sem-imagem")
    public ResponseEntity<Animais> createAnimal(@RequestBody Animais animal) {
        Animais createdAnimal = service.create(animal);
        return new ResponseEntity<>(createdAnimal, HttpStatus.CREATED);
    }

    @PostMapping()
    public ResponseEntity<Animais> cadastrarAnimal(@RequestParam("nome") String nome,
                                                   @RequestParam("raca") String raca,
                                                   @RequestParam("sexo") String sexo,
                                                   @RequestParam("descricao") String descricao,
                                                   @RequestParam("idade") int idade,
                                                   @RequestParam("tipo") String tipo,
                                                   @RequestParam("email") String email,
                                                   @RequestParam("imagem") MultipartFile imagem)
    {
        try {
            Optional<ONGs> ongs = serviceOng.findByCnpj(email);
            Animais animal = new Animais();
            animal.setNome(nome);
            animal.setRaca(raca);
            animal.setSexo(sexo);
            animal.setDescricao(descricao);
            animal.setIdade(idade);
            animal.setTipo(tipo);
            animal.setProprietarioTipo("ong");
            animal.setProprietarioId(ongs.get().getOngid());
            animal.setImagem(imagem.getBytes());

            Animais novoAnimal = service.create(animal);
            return new ResponseEntity<>(novoAnimal, HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Animais> updateAnimal(
            @PathVariable Integer id,
            @RequestParam("nome") String nome,
            @RequestParam("raca") String raca,
            @RequestParam("sexo") String sexo,
            @RequestParam("descricao") String descricao,
            @RequestParam("idade") int idade,
            @RequestParam("tipo") String tipo,
            @RequestParam(value = "imagem", required = false) MultipartFile imagem) {

        Animais animal = new Animais();
        animal.setNome(nome);
        animal.setRaca(raca);
        animal.setSexo(sexo);
        animal.setDescricao(descricao);
        animal.setIdade(idade);
        animal.setTipo(tipo);

        if (imagem != null && !imagem.isEmpty()) {
            try {
                byte[] imageBytes = imagem.getBytes();
                animal.setImagem(imageBytes);
            } catch (IOException e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        Animais updatedAnimal = service.update(id, animal);
        return new ResponseEntity<>(updatedAnimal, HttpStatus.OK);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnimal(@PathVariable Integer id) {
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/cidade/{cidade}")
    public ResponseEntity<List<Animais>> getAnimaisByCidade(@PathVariable String cidade) {
        List<Animais> animais = service.findAnimaisByCidade(cidade);
        return new ResponseEntity<>(animais, HttpStatus.OK);
    }
}
