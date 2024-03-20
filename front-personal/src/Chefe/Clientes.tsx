import React from 'react';

interface Clientes {
  id: number;
  nome: string;
  dataProximoAgendamento: string;
  dataUltimoAgendamento: string;
  bairro: string;
}

interface Props {
  clients: Clientes[];
}

const Clientes: React.FC<Props> = ({ clients }) => {
  return (
    <div>
      <h2>Lista de Clientes</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Data do Próximo Agendamento</th>
            <th>Data do Último Agendamento</th>
            <th>Bairro</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.nome}</td>
              <td>{client.dataProximoAgendamento}</td>
              <td>{client.dataUltimoAgendamento}</td>
              <td>{client.bairro}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Clientes;