package com.novametha.api_personalchef.model;



import jakarta.persistence.Entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;


@Entity
@Table(name="cliente")
@Getter 
@Setter 
public class Cliente{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome ;
    private String email ;
    private String password ;
    private String cpf;
    private String bairro;
    private String cidade;
    private String Estado;
    private LocalDate DataNasc;
    private String endereço;
   

    // Novos atributos adicionados
    private String restricao;
    private String restricaoLeite;
    private String typeRestricaoLeite;
    private String alimentosRestricao;
    private String notProteina;
    private String proteinaRestrita;
    private String alimentosRestritos;
    private String notTempero;
    private String introduzir;
    private String preferencia;
    private boolean acompanhamentoNutricional;
    
  

  

}
