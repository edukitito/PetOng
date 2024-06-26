package com.fatec.petong.Controllers;

import com.fatec.petong.Entities.ONGs;
import com.fatec.petong.Services.ONGService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/ongs")
public class ONGsController {

    @Autowired
    private ONGService ongService;

    @GetMapping
    public ResponseEntity<List<ONGs>> getAllUsers() {
        List<ONGs> ongs = ongService.findAll();
        return ResponseEntity.ok().body(ongs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ONGs> getUserById(@PathVariable int id) {
        Optional<ONGs> ong = ongService.findById(id);
        return ong.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<?> createOng(@RequestBody ONGs ong) {
        if (ong.getCidade() == null || ong.getEstado() == null || ong.getPix() == null) {
            return new ResponseEntity<>("Informações de cidade, estado ou pix estão faltando", HttpStatus.BAD_REQUEST);
        }
        ONGs createdONG = ongService.create(ong);
        return new ResponseEntity<>(createdONG, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ONGs> updateUser(@PathVariable int id, @RequestBody ONGs ongDetails) {
        ONGs updatedONG = ongService.update(id, ongDetails);
        if (updatedONG != null) {
            return new ResponseEntity<>(updatedONG, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable int id) {
        ongService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/cnpj/{cnpj}")
    public ResponseEntity<ONGs> getOngByCnpj(@PathVariable String cnpj) {
        Optional<ONGs> ong = ongService.findByCnpj(cnpj);
        return ong.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String email,
                                        @RequestParam String senha,
                                        HttpSession session) {

        String validação = ongService.validateUser(email, senha);
        if (validação.equals("Aprovado")) {
            session.setAttribute("user", email);
            return ResponseEntity.ok(email);
        } else if(validação.equals("Senha Incorreta")) {
            return new ResponseEntity<>("Senha Inválida", HttpStatus.UNAUTHORIZED);
        } else {
            return new ResponseEntity<>("Usuário Não Encontrado", HttpStatus.UNAUTHORIZED);
        }
    }
}
