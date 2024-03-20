
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

import com.novametha.api_personalchef.Service.ClienteService;
import com.novametha.api_personalchef.model.Cliente;



@RestController
@CrossOrigin(origins="*")
@RequestMapping("/api/cliente")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @PostMapping("/cadastrar")
    public ResponseEntity<Cliente> cadastrarCliente(@RequestBody Cliente cliente) {
        Cliente novoCliente = clienteService.cadastrarCliente(cliente);
        return new ResponseEntity<>(novoCliente, HttpStatus.CREATED);
    }
    @GetMapping("/listar")
    public Iterable<Cliente> listar(){
        return clienteService.listar();
    }
   
        @DeleteMapping("/remover/{codigo}")
    public ResponseEntity<Cliente> remover(@PathVariable long codigo){
        return clienteService.remover(codigo);
    }

}
