package com.novametha.api_personalchef.Service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.novametha.api_personalchef.Repository.InsumoQuantidadeRepository;
import com.novametha.api_personalchef.Repository.InsumoRepository;
import com.novametha.api_personalchef.Repository.ReceitaRepository;
import com.novametha.api_personalchef.model.Insumo;
import com.novametha.api_personalchef.model.InsumoQuantidade;
import com.novametha.api_personalchef.model.Receita;

@Service
public class ReceitaService {
    @Autowired
    private ReceitaRepository receitaRepository;

    @Autowired
    private InsumoRepository insumoRepository;

    @Autowired
    private InsumoQuantidadeRepository insumoQuantidadeRepository;

    public Receita cadastrarReceita(Receita receita) {
        // Garante que os Insumos associados à Receita existam no banco de dados
        for (InsumoQuantidade insumoQuantidade : receita.getInsumoQuantidade()) {
            Insumo insumo = insumoRepository.findById(insumoQuantidade.getInsumo().getId())
                    .orElseThrow(() -> new RuntimeException("Insumo não encontrado: " + insumoQuantidade.getInsumo().getId()));
            insumoQuantidade.setInsumo(insumo);
        }

        // Salva a Receita e as associações com Insumos
        Receita novaReceita = receitaRepository.save(receita);
        for (InsumoQuantidade insumoQuantidade : receita.getInsumoQuantidade()) {
            insumoQuantidade.setReceita(novaReceita);
            insumoQuantidadeRepository.save(insumoQuantidade);
        }

        return novaReceita;
    }
}

 

