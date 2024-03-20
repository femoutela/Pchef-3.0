package com.novametha.api_personalchef.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.novametha.api_personalchef.Service.InsumoService;
import com.novametha.api_personalchef.model.Insumo;


@RestController
@CrossOrigin(origins="*")
@RequestMapping("/api/insumos")
public class InsumoController {

    @Autowired
    private InsumoService insumoService;

    @PostMapping("/cadastrar")
    public ResponseEntity<Insumo> cadastrarInsumo(@RequestBody Insumo insumo) {
        Insumo novoInsumo = insumoService.cadastrarInsumo(insumo);
        return new ResponseEntity<>(novoInsumo, HttpStatus.CREATED);
    }
    @GetMapping("/listar")
    public Iterable<Insumo> listar(){
        return insumoService.listar();
    }
   
        @DeleteMapping("/remover/{codigo}")
    public ResponseEntity<Insumo> remover(@PathVariable long codigo){
        return insumoService.remover(codigo);
    }

}
