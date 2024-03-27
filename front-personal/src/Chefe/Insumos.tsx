import { useState, useEffect } from 'react';
import '../App.css';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import '../font.css';

const verificarUserSchema = z.object({
  nome: z.string().nonempty('Campo obrigatório'),
  unidadeMedida: z.string().nonempty('Campo obrigatório'),
});

type VerificaUserFormData = z.infer<typeof verificarUserSchema>;

export function Insumos() {
  const [output, setOutput] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
 // const [dataFromApi, setDataFromApi] = useState<any[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<VerificaUserFormData>({
    resolver: zodResolver(verificarUserSchema)
  });

  useEffect(() => {
  
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:8080/api/insumos/listar');
        if (!response.ok) {
          throw new Error('Erro ao obter os dados da API');
        }
       // const data = await response.json();
       // setDataFromApi(data);
      } catch (error) {
        console.error('Erro ao obter os dados da API:', error);
      }
    }

    fetchData();
  }, [output]); // Requisitar novamente quando houver uma mudança na saída (output)

  async function verificarUser(data: VerificaUserFormData) {
    try {
      const response = await fetch('http://localhost:8080/api/insumos/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar os dados para a API');
      }

      setOutput('Insumo cadastrado com sucesso');
      reset(); // Limpar os campos do formulário
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      setOutput('Erro ao enviar os dados para a API');
    }
  }



  return (
    <main className="Container-insumo">
      <form  className="form-insumo" autoComplete="off" onSubmit={handleSubmit(verificarUser)}>
        <input
        autoComplete="off"
          type='text'
          placeholder='Nome Insumo'
          className='input-nome-receita'
          {...register('nome')}
        />
        {errors.nome && <span>{errors.nome.message}</span>}

        <select
          className="input-nome-receita"
          {...register('unidadeMedida')}
        >
          <option value="G">Grama</option>
          <option value="UN">Unidade</option>
          <option value="ML">Litro</option>
        </select>
        {errors.unidadeMedida && <span>{errors.unidadeMedida.message}</span>}

        <button type='submit' className="Botao-principal">
          Incluir
        </button>
      </form>

      {/* <table>
        <thead>
          <tr>
            <th>Insumo</th>
            <th>Medida</th>
          </tr>
        </thead>
        <tbody>
          {dataFromApi.map((item, index) => (
            <tr key={index}>
              <td>{item.nome}</td>
              <td>{item.unidadeMedida}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
      <br></br>
      <pre>{output}</pre>
    </main>
  );
}
