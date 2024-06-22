package com.fatec.petong.Services;

import com.fatec.petong.Entities.Adocao;
import com.fatec.petong.Repositories.AdocaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class AdocaoService {

    @Autowired
    private AdocaoRepository adocaoRepository;

    public Adocao saveAdocao(Adocao adocao) {
        return adocaoRepository.save(adocao);
    }

    @Transactional(readOnly = true)
    public List<Adocao> getAllAdocoes() {
        return adocaoRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Adocao> getAdocaoById(Integer id) {
        return adocaoRepository.findById(id);
    }

    public Adocao updateAdocao(Adocao adocao) {
        return adocaoRepository.save(adocao);
    }

    public void deleteAdocao(Integer id) {
        adocaoRepository.deleteById(id);
    }
}
