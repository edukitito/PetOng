package com.fatec.petong.Controllers;

import com.fatec.petong.Entities.ONGs;
import com.fatec.petong.Entities.Usuarios;
import com.fatec.petong.Services.ONGService;
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
    public ResponseEntity<ONGs> createOng(@RequestBody ONGs ong) {
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
}
