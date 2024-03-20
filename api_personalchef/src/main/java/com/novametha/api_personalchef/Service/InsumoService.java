package com.novametha.api_personalchef.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.novametha.api_personalchef.Repository.InsumoRepository;
import com.novametha.api_personalchef.model.Insumo;

@Service
public class InsumoService {

    @Autowired
    private InsumoRepository insumoRepository;

    public Insumo cadastrarInsumo(Insumo insumo) {
        return insumoRepository.save(insumo);
    }
    public Iterable<Insumo>listar(){
        return insumoRepository.findAll();
    }

        public ResponseEntity<Insumo> remover(long codigo) {
        // Verifica se o insumo existe antes de tentar removê-lo
        if (insumoRepository.existsById(codigo)) {
            Insumo insumo = insumoRepository.findById(codigo).get();
            insumoRepository.delete(insumo);
            return new ResponseEntity<>(insumo, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}