package com.novametha.api_personalchef.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.novametha.api_personalchef.Service.PedidoService;
import com.novametha.api_personalchef.model.Insumo;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/api")
public class PedidoController {
    @Autowired
    private PedidoService pedidoService;

    @PostMapping("/adicionar-receita/{receitaId}")
    public ResponseEntity<String> adicionarReceitaAoPedido(@PathVariable Long receitaId) {
        pedidoService.adicionarReceitaAoPedido(receitaId);
        return ResponseEntity.ok("Receita adicionada ao pedido com sucesso!");
    }

    @GetMapping("/insumos-usados")
    public ResponseEntity<List<Insumo>> getInsumosUsados() {
        List<Insumo> insumosUsados = pedidoService.getInsumosUsados();
        return ResponseEntity.ok(insumosUsados);
    }
}