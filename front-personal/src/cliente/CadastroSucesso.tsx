import { useLocation } from 'react-router-dom';

export function CadastroSucesso() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  // Extrair os parâmetros da consulta da URL
  const nome = query.get('nome');
  const email = query.get('email');
  const cpf = query.get('cpf');
  // Adicione os outros campos conforme necessário

  return (
    <div>
      <h2>Cadastrado com Sucesso!</h2>
      <p>Veja abaixo os detalhes do seu cadastro:</p>
      <ul>
        <li>Nome: {nome}</li>
        <li>Email: {email}</li>
        <li>CPF: {cpf}</li>
        {/* Adicione os outros campos conforme necessário */}
      </ul>
    </div>
  );
}