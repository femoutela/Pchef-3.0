package com.novametha.api_personalchef.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.novametha.api_personalchef.Repository.ClienteRepository;
import com.novametha.api_personalchef.model.Cliente;


@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public Cliente cadastrarCliente(Cliente cliente) {
        return clienteRepository.save(cliente);
    }
    public Iterable<Cliente>listar(){
        return clienteRepository.findAll();
    }

        public ResponseEntity<Cliente> remover(long codigo) {
        // Verifica se o insumo existe antes de tentar removê-lo
        if (clienteRepository.existsById(codigo)) {
            Cliente cliente = clienteRepository.findById(codigo).get();
            clienteRepository.delete(cliente);
            return new ResponseEntity<>(cliente, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}