package com.fatec.petong.Services;

import com.fatec.petong.Entities.Adocao;
import com.fatec.petong.Repositories.AdocaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdocaoService {

    @Autowired
    private AdocaoRepository adocaoRepository;

    public List<Adocao> findAll() {
        return adocaoRepository.findAll();
    }

    public Optional<Adocao> findById(Integer id) {
        return adocaoRepository.findById(id);
    }

    public Adocao create(Adocao adocao) {
        return adocaoRepository.save(adocao);
    }

    public Adocao update(Integer id, Adocao adocaoDetails) {
        Optional<Adocao> adocaoOptional = adocaoRepository.findById(id);
        if (adocaoOptional.isPresent()) {
            Adocao adocao = adocaoOptional.get();
            adocao.setUsuario(adocaoDetails.getUsuario());
            adocao.setAnimal(adocaoDetails.getAnimal());
            adocao.setOng(adocaoDetails.getOng());
            adocao.setDataAdocao(adocaoDetails.getDataAdocao());
            adocao.setEtapaAdocao(adocaoDetails.getEtapaAdocao());
            adocao.setStatusAdocao(adocaoDetails.getStatusAdocao());
            return adocaoRepository.save(adocao);
        } else {
            return null; // Ou lance uma exceção indicando que a adoção não foi encontrada
        }
    }

    public void delete(Integer id) {
        adocaoRepository.deleteById(id);
    }
}
