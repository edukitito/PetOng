package com.fatec.petong.Controllers;

import com.fatec.petong.Entities.Adocao;
import com.fatec.petong.Services.AdocaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/adocoes")
public class AdocaoController {

    @Autowired
    private AdocaoService adocaoService;

    @GetMapping
    public ResponseEntity<List<Adocao>> getAllAdocoes() {
        List<Adocao> adocaoList = adocaoService.findAll();
        return new ResponseEntity<>(adocaoList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Adocao> getAdocaoById(@PathVariable Integer id) {
        Optional<Adocao> adocao = adocaoService.findById(id);
        return adocao.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Adocao> createAdocao(@RequestBody Adocao adocao) {
        Adocao createdAdocao = adocaoService.create(adocao);
        return new ResponseEntity<>(createdAdocao, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Adocao> updateAdocao(@PathVariable Integer id, @RequestBody Adocao adocaoDetails) {
        Adocao updatedAdocao = adocaoService.update(id, adocaoDetails);
        if (updatedAdocao != null) {
            return new ResponseEntity<>(updatedAdocao, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdocao(@PathVariable Integer id) {
        adocaoService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
