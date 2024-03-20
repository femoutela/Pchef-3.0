package com.novametha.api_personalchef.Service;

import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Service;

import com.novametha.api_personalchef.model.Insumo;

@Service
public class PedidoService {
    // ...

    public void adicionarReceitaAoPedido(Long receitaId) {
        // Lógica para adicionar receita ao pedido
    }

    public List<Insumo> getInsumosUsados() {
        // Lógica para obter insumos usados no pedido
        return Collections.emptyList(); // Substitua isso com sua lógica real
    }
}