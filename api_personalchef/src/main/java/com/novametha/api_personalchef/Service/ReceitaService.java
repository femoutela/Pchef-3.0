package com.novametha.api_personalchef.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.fasterxml.jackson.databind.ObjectMapper;
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

    // Diretório onde as fotos serão salvas
    private static final String FOTO_DIRECTORY = "C:\\pchef 3.0\\api_personalchef\\src\\main\\java\\com\\novametha\\api_personalchef\\img";

    public Receita cadastrarReceita(Receita receita, MultipartFile foto) {
        if (foto != null && !foto.isEmpty()) {
            try {
                // Salvar a foto no diretório especificado
                String fotoNome = System.currentTimeMillis() + "_" + foto.getOriginalFilename();
                Path fotoPath = Path.of(FOTO_DIRECTORY, fotoNome);
                Files.copy(foto.getInputStream(), fotoPath, StandardCopyOption.REPLACE_EXISTING);

                // Definir o nome do arquivo da foto na receita
                receita.setFoto(fotoNome);
            } catch (IOException e) {
                throw new RuntimeException("Falha ao salvar a foto da receita", e);
            }
        }

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

    public Receita cadastrarReceita(String nome, MultipartFile foto, String insumoQuantidadeJson) {
        Receita novaReceita = new Receita();
        novaReceita.setNome(nome);

        // Processa o JSON de insumoQuantidade
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            InsumoQuantidade[] insumoQuantidades = objectMapper.readValue(insumoQuantidadeJson, InsumoQuantidade[].class);
            novaReceita.setInsumoQuantidade(Arrays.asList(insumoQuantidades));
        } catch (IOException e) {
            throw new RuntimeException("Falha ao processar o JSON de insumoQuantidade", e);
        }

        // Chama o método existente para cadastrar a receita
        return cadastrarReceita(novaReceita, foto);
    }
}
