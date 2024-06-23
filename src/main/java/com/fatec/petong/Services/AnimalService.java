package com.fatec.petong.Services;

import com.fatec.petong.Entities.Animais;
import com.fatec.petong.Entities.AnimalOngDTO;
import com.fatec.petong.Entities.ONGs;
import com.fatec.petong.Repositories.AnimalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnimalService {

    @Autowired
    private AnimalRepository animalRepository;

    @Autowired
    private ONGService ongRepository;

    public List<Animais> findAll(){
        return animalRepository.findAll();
    }

    public Optional<Animais> findById(int id){
        return animalRepository.findById(id);
    }

    public Animais create(Animais animais){
        return animalRepository.save(animais);
    }

    public List<Animais> searchAnimals(String tipo, String cidade, String estado) {
        if (tipo == null && cidade == null && estado == null) {
            return animalRepository.findAll();
        } else if (tipo != null && (cidade == null || cidade.equals("")) && (estado == null || estado.equals(""))) {
            return animalRepository.findAnimaisByTipo(tipo);
        } else if (tipo == null && cidade != null && !cidade.equals("") && (estado == null || estado.equals(""))) {
            return animalRepository.findAnimaisByCidade(cidade);
        } else if (tipo == null && (cidade == null || cidade.equals("")) && estado != null && !estado.equals("")) {
            return animalRepository.findAnimaisByEstado(estado);
        } else if (tipo != null && cidade != null && !cidade.equals("") && (estado == null || estado.equals(""))) {
            return animalRepository.findAnimaisByCidadeTipo(cidade, tipo);
        } else if (tipo != null && (cidade == null || cidade.equals("")) && estado != null && !estado.equals("")) {
            return animalRepository.findAnimaisByEstadoTipo(estado, tipo);
        } else {
            return animalRepository.findAll();
        }
    }



    public Animais update(int id, Animais animais){
        Optional<Animais> animalOptional = animalRepository.findById(id);
        if(animalOptional.isPresent()){
            Animais animal = animalOptional.get();
            animal.setNome(animais.getNome());
            animal.setIdade(animais.getIdade());
            animal.setSexo(animais.getSexo());
            animal.setDescricao(animais.getDescricao());
            animal.setTipo(animais.getTipo());
            animal.setRaca(animais.getRaca());
            animal.setImagem(animais.getImagem());
            return animalRepository.save(animal);
        } else {
            return null;
        }
    }

    public void delete(int id){
        animalRepository.deleteById(id);
    }

    public List<Animais> findAnimaisByCidade(String cidade) {
        return animalRepository.findAnimaisByCidade(cidade);
    }

    public List<Animais> findByOng(Integer ongId, String proprietarioTipo) {
        return animalRepository.findAnimaisByProprietarioIdAndAndProprietarioTipo(ongId, proprietarioTipo);
    }

    public Optional<AnimalOngDTO> getAnimalOngDetails(int animalId) {
        Optional<Animais> animal = animalRepository.findById(animalId);
        if (animal.isPresent()) {
            Animais a = animal.get();
            Optional<ONGs> ong = ongRepository.findById(a.getProprietarioId());
            if (ong.isPresent()) {
                ONGs o = ong.get();
                AnimalOngDTO dto = new AnimalOngDTO();
                dto.setAnimalId(a.getId());
                dto.setAnimalNome(a.getNome());
                dto.setAnimalRaca(a.getRaca());
                dto.setAnimalSexo(a.getSexo());
                dto.setAnimalDescricao(a.getDescricao());
                dto.setAnimalIdade(a.getIdade());
                dto.setAnimalTipo(a.getTipo());
                dto.setAnimalImagem(a.getImagem());
                dto.setOngId(o.getOngid());
                dto.setOngNome(o.getNome());
                dto.setOngDescricao(o.getDescricao());
                dto.setOngEmail(o.getEmail());
                dto.setOngTelefone(o.getTelefone());
                dto.setOngEndereco(o.getEndereco());
                dto.setOngCidade(o.getCidade());
                dto.setOngEstado(o.getEstado());
                dto.setOngCnpj(o.getCnpj());
                dto.setOngPix(o.getPix());
                return Optional.of(dto);
            }
        }
        return Optional.empty();
    }
}
