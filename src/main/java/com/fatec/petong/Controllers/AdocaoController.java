package com.fatec.petong.Controllers;

import com.fatec.petong.Entities.Adocao;
import com.fatec.petong.Entities.Enums.EtapaAdocao;
import com.fatec.petong.Entities.Enums.StatusAdocao;
import com.fatec.petong.Services.AdocaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/adocoes")
public class AdocaoController {

    @Autowired
    private AdocaoService adocaoService;

    @PostMapping
    public ResponseEntity<Adocao> createAdocao(@RequestBody Adocao adocao) {
        adocao.setDataAdocao(new Date());
        adocao.setEtapaAdocao(EtapaAdocao.INICIO);
        adocao.setStatusAdocao(StatusAdocao.PENDENTE);
        System.out.println(adocao.getOng().getOngid());
        Adocao createdAdocao = adocaoService.saveAdocao(adocao);
        return ResponseEntity.ok(createdAdocao);
    }

    @GetMapping
    public ResponseEntity<List<Adocao>> getAllAdocoes() {
        List<Adocao> adocoes = adocaoService.getAllAdocoes();
        return ResponseEntity.ok(adocoes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Adocao> getAdocaoById(@PathVariable Integer id) {
        Optional<Adocao> adocao = adocaoService.getAdocaoById(id);
        return adocao.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Adocao> updateAdocao(@PathVariable Integer id, @RequestBody Adocao adocao) {
        if (!adocaoService.getAdocaoById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        adocao.setId(id);
        Adocao updatedAdocao = adocaoService.updateAdocao(adocao);
        return ResponseEntity.ok(updatedAdocao);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdocao(@PathVariable Integer id) {
        if (!adocaoService.getAdocaoById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        adocaoService.deleteAdocao(id);
        return ResponseEntity.noContent().build();
    }
}