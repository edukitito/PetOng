package com.fatec.petong.Services;

import com.fatec.petong.Entities.Adocao;
import com.fatec.petong.Entities.Enums.EtapaAdocao;
import com.fatec.petong.Entities.Enums.StatusAdocao;
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

    public List<Adocao> getAdocoesByUserId(Integer userId) {
        return adocaoRepository.findByUsuarioId(userId);
    }

    public List<Adocao> getAdocoesByOngId(Integer ongId) {
        return adocaoRepository.findAdocaoByOng_Ongid(ongId);
    }

    @Transactional(readOnly = true)
    public Optional<Adocao> getAdocaoById(Integer id) {
        return adocaoRepository.findById(id);
    }

    public Adocao updateAdocao(Adocao adocao) {
        return adocaoRepository.save(adocao);
    }

    public void updateAdocaoStatus(Integer id, StatusAdocao statusAdocao) {
        Adocao adocao = adocaoRepository.findById(id).orElseThrow(() -> new RuntimeException("Adoção não encontrada"));
        adocao.setStatusAdocao(statusAdocao);
        adocaoRepository.save(adocao);
    }

    public void updateAdocaoEtapa(Integer id, EtapaAdocao etapaAdocao) {
        Adocao adocao = adocaoRepository.findById(id).orElseThrow(() -> new RuntimeException("Adoção não encontrada"));
        adocao.setEtapaAdocao(etapaAdocao);
        adocaoRepository.save(adocao);
    }

    public void deleteAdocao(Integer id) {
        adocaoRepository.deleteById(id);
    }
}
