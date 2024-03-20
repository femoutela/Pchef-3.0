package com.novametha.api_personalchef.Repository;
import org.springframework.data.repository.CrudRepository;
import com.novametha.api_personalchef.model.Cliente;

public interface ClienteRepository extends CrudRepository<Cliente, Long> {
}