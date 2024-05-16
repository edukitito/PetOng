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
@RequestMapping("/adocoes")
public class AdocaoController {
    @Autowired
    private AdocaoService adocaoService;

    @GetMapping
    public ResponseEntity<List<Adocao>> getAllAdocoes() {
        List<Adocao> adocoes = adocaoService.getAllAdocoes();
        return new ResponseEntity<>(adocoes, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Adocao> getAdocaoById(@PathVariable Integer id) {
        Optional<Adocao> adocaoOptional = adocaoService.getAdocaoById(id);
        return adocaoOptional.map(adocao -> new ResponseEntity<>(adocao, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Adocao> saveAdocao(@RequestBody Adocao adocao) {
        Adocao savedAdocao = adocaoService.saveAdocao(adocao);
        return new ResponseEntity<>(savedAdocao, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Adocao> updateAdocao(@PathVariable Integer id, @RequestBody Adocao adocao) {
        Adocao updatedAdocao = adocaoService.updateAdocao(id, adocao);
        if (updatedAdocao != null) {
            return new ResponseEntity<>(updatedAdocao, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdocao(@PathVariable Integer id) {
        adocaoService.deleteAdocao(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
