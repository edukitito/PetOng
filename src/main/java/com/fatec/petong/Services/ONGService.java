package com.fatec.petong.Services;

import com.fatec.petong.Entities.ONGs;
import com.fatec.petong.Entities.Usuarios;
import com.fatec.petong.Repositories.ONGsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
    public class ONGService {

    @Autowired
    private ONGsRepository ongsRepository;

    public List<ONGs> findAll() {
        return ongsRepository.findAll();
    }

    public Optional<ONGs> findById(int id) {
        return ongsRepository.findById(id);
    }

    public ONGs create(ONGs ong) {
        return ongsRepository.save(ong);
    }

    public ONGs update(int id, ONGs ongDetails) {
        Optional<ONGs> ongOptional = ongsRepository.findById(id);
        if (ongOptional.isPresent()) {
            ONGs ong = ongOptional.get();
            ong.setNome(ongDetails.getNome());
            ong.setDescricao(ongDetails.getDescricao());
            ong.setEmail(ongDetails.getEmail());
            ong.setTelefone(ongDetails.getTelefone());
            ong.setEndereco(ongDetails.getEndereco());
            ong.setCidade(ongDetails.getCidade());
            ong.setEstado(ongDetails.getEstado());
            ong.setCnpj(ongDetails.getCnpj());
            ong.setPix(ongDetails.getPix());
            ong.setSenha(ongDetails.getSenha());
            // Adicione aqui a lógica para atualizar outras propriedades, se necessário
            return ongsRepository.save(ong);
        } else {
            return null; // Ou lance uma exceção indicando que a ONG não foi encontrada
        }
    }

    public void delete(int id) {
        ongsRepository.deleteById(id);
    }

    public Optional<ONGs> findByCnpj(String cnpj) {
        return ongsRepository.findByCnpj(cnpj);
    }

    public String validateUser(String cnpj, String senha) {
        Optional<ONGs> ong = ongsRepository.findByCnpj(cnpj);
        if (ong.isPresent() && ong.get().getSenha().equals(senha)) {
            return "Aprovado";
        } else if(ong.isPresent() && !ong.get().getSenha().equals(senha)){
            return "Senha Incorreta";
        } else {
            return "Email não encontrado";
        }
    }

}
