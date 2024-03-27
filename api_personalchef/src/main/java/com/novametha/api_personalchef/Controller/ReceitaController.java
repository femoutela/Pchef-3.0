package com.novametha.api_personalchef.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.novametha.api_personalchef.Service.ReceitaService;
import com.novametha.api_personalchef.model.Receita;

@CrossOrigin(origins="*")
@RestController
@RequestMapping("/api/receitas")
public class ReceitaController {
    
    @Autowired
    private ReceitaService receitaService;

    @PostMapping
    public ResponseEntity<Receita> cadastrarReceita(@RequestParam("nome") String nome,
                                                    @RequestParam("foto") MultipartFile foto,
                                                    @RequestParam("insumoQuantidade") String insumoQuantidadeJson) {
        Receita novaReceita = receitaService.cadastrarReceita(nome, foto, insumoQuantidadeJson);
        return new ResponseEntity<>(novaReceita, HttpStatus.CREATED);
    }
}
