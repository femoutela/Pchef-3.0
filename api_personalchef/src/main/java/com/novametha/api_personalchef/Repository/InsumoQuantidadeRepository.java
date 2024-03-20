package com.novametha.api_personalchef.Repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.novametha.api_personalchef.model.InsumoQuantidade;

@Repository
public interface InsumoQuantidadeRepository extends CrudRepository<InsumoQuantidade, Long> {
    
}

