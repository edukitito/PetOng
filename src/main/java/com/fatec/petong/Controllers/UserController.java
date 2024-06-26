package com.fatec.petong.Controllers;

import com.fatec.petong.Entities.Usuarios;
import com.fatec.petong.Services.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<Usuarios>> getAllUsers() {
        List<Usuarios> users = userService.findAll();
        return ResponseEntity.ok().body(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuarios> getUserById(@PathVariable int id) {
        Optional<Usuarios> user = userService.findById(id);
        return user.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Usuarios> createUser(@RequestBody Usuarios usuario) {
        Usuarios createdUser = userService.create(usuario);
        if (createdUser != null) {
            return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuarios> updateUser(@PathVariable int id, @RequestBody Usuarios usuarioDetails) {
        Usuarios updatedUser = userService.update(id, usuarioDetails);
        if (updatedUser != null) {
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable int id) {
        userService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Usuarios> getUserByEmail(@PathVariable String email) {
        Optional<Usuarios> user = userService.findByEmail(email);
        return user.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String email,
                                        @RequestParam String senha,
                                        HttpSession session) {

        String validação = userService.validateUser(email, senha);
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
