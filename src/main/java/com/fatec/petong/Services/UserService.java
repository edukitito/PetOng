package com.fatec.petong.Services;

import com.fatec.petong.Entities.Usuarios;
import com.fatec.petong.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
    public class UserService {

        @Autowired
        private UserRepository repository;

        public List<Usuarios> findAll() {
            return repository.findAll();
        };

        public Optional<Usuarios> findById(int id) {
            return repository.findById(id);
        }

        @Transactional
        public Usuarios create(Usuarios usuario) {
            try {
                repository.cadastrarUsuario(usuario.getNome(),usuario.getEmail(),usuario.getSenha(),usuario.getTelefone(),usuario.getCpf(),usuario.getEndereco(),
                        usuario.getCidade(),usuario.getEstado(),usuario.getNickname());
                return repository.findUltimoUsuarioCadastrado();
            }catch (Exception e){
                System.err.println("Erro ao cadastrar usuário: " + e.getMessage());
                return null;
            }
        }

        public Usuarios update(int id, Usuarios usuarioDetails) {
            Optional<Usuarios> usuarioOptional = repository.findById(id);
            if (usuarioOptional.isPresent()) {
                Usuarios usuario = usuarioOptional.get();
                usuario.setNome(usuarioDetails.getNome());
                usuario.setEmail(usuarioDetails.getEmail());
                usuario.setSenha(usuarioDetails.getSenha());
                usuario.setTelefone(usuarioDetails.getTelefone());
                usuario.setCpf(usuarioDetails.getCpf());
                usuario.setEndereco(usuarioDetails.getEndereco());
                usuario.setCidade(usuarioDetails.getCidade());
                usuario.setEstado(usuarioDetails.getEstado());
                usuario.setNickname(usuarioDetails.getNickname());
                // Adicione aqui a lógica para atualizar outras propriedades, se necessário
                return repository.save(usuario);
            } else {
                return null; // Ou lance uma exceção indicando que o usuário não foi encontrado
            }
        }

    public void delete(int id) {
        repository.deleteById(id);
    }

    public Optional<Usuarios> findByEmail(String email) {
        return repository.findByEmail(email);
    }

    public String validateUser(String email, String senha) {
        Optional<Usuarios> user = repository.findByEmail(email);
        if (user.isPresent() && user.get().getSenha().equals(senha)) {
            return "Aprovado";
        } else if(user.isPresent() && !user.get().getSenha().equals(senha)){
            return "Senha Incorreta";
        } else {
            return "Email não encontrado";
        }
    }

}
