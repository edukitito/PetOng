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

    public List<Animais> searchAnimals(String tipo, String cidade, String estado) {
        // Implemente a lógica de busca aqui. Você pode usar o JpaRepository ou criar uma consulta personalizada.
        if (tipo == null && cidade == null && estado == null) {
            return animalRepository.findAll();
        } else {
            return animalRepository.findByTipoAndCidadeAndEstado(tipo, cidade, estado);
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
}
