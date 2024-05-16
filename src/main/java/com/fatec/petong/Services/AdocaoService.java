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

    public List<Adocao> getAllAdocoes() {
        return adocaoRepository.findAll();
    }

    public Optional<Adocao> getAdocaoById(Integer id) {
        return adocaoRepository.findById(id);
    }

    public Adocao updateAdocao(Integer id, Adocao adocaoAtualizada) {
        Optional<Adocao> adocaoOptional = adocaoRepository.findById(id);
        if (adocaoOptional.isPresent()) {
            Adocao adocaoExistente = adocaoOptional.get();
            adocaoExistente.setEtapaAdocao(adocaoAtualizada.getEtapaAdocao());
            adocaoExistente.setStatusAdocao(adocaoAtualizada.getStatusAdocao());
            return adocaoRepository.save(adocaoExistente);
        } else {
            // Lidar com o caso em que a adoção não é encontrada
            return null;
        }
    }

    public Adocao saveAdocao(Adocao adocao) {
        return adocaoRepository.save(adocao);
    }

    public void deleteAdocao(Integer id) {
        adocaoRepository.deleteById(id);
    }
}
