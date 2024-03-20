# Pchef-3.0

## Endpont para adicionar receitas
http://localhost:8080/api/receitas

### Exemplo 
{
  "nome": "Bolo de Chocolate",
  "insumoQuantidade": [
    {
      "insumo": {
        "id": 1,
        "nome": "Farinha de trigo"
      },
      "quantidade": 200
    },
    {
      "insumo": {
        "id": 2,
        "nome": "Açúcar"
      },
      "quantidade": 150
    },
    {
      "insumo": {
        "id": 3,
        "nome": "Chocolate em pó"
      },
      "quantidade": 50
    }
  ]
}


## Endpont para adicionar insumos
http://localhost:8080/api/insumos/cadastrar

### Exemplo 
{
  "nome": "Manteiga",
  "quantidade": 500,
  "unidadeMedida": "G"
}

