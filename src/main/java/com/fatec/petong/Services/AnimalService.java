package com.fatec.petong.Services;

import com.fatec.petong.Entities.Animais;
import com.fatec.petong.Repositories.AnimalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnimalService {

    @Autowired
    private AnimalRepository animalRepository;

    public List<Animais> findAll(){
        return animalRepository.findAll();
    }

    public Optional<Animais> findById(int id){
        return animalRepository.findById(id);
    }

    public Animais create(Animais animais){
        return animalRepository.save(animais);
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
            animal.setProprietarioId(animais.getProprietarioId());
            animal.setProprietarioTipo(animais.getProprietarioTipo());
            animal.setRaca(animais.getRaca());
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
}
