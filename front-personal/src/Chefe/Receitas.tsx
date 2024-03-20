import { useEffect, useState } from 'react';
import '../App.css';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import '../font.css';

const verificarUserSchema = z.object({
  receita: z.string(),
  insumosQuantidade: z.array(z.object({
      id_insumos: z.string(),
      quantidade: z.number(),
      unidadeMedida: z.string(),
  }))
});

type VerificaUserFormData = z.infer<typeof verificarUserSchema>;

export function Receitas() {
  const [output, setOutput] = useState('');
  const [insumos, setInsumos] = useState([{ id: 0, nome: '', unidadeMedida: '' }]);
  const [selectedInsumoIndex, setSelectedInsumoIndex] = useState<number | null>(null);

  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    control,
  } = useForm<VerificaUserFormData>({
    resolver: zodResolver(verificarUserSchema)
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'insumosQuantidade',
  });

  function verificarUser(data: unknown) {
    console.log(data); // Verifica os dados recebidos
    setOutput(JSON.stringify(data, null, 2));
  }

  function addNewInsumo() {
    append({ id_insumos: '', quantidade: 0, unidadeMedida: '' });
  }

  useEffect(() => {
    // Busca os insumos do banco de dados
    fetch("http://localhost:8080/api/insumos/listar")
      .then((retorno) => retorno.json())
      .then((retorno_convertido) => setInsumos(retorno_convertido))
      .catch((error) => console.error('Erro ao buscar insumos:', error));
  }, []);

  return (
    <main className="Container-insumo">
      <form className="form-login" onSubmit={handleSubmit(verificarUser)}>
        <input 
          type='text' 
          placeholder='Nome da Receita'
          className="input-nome-receita"
          {...register('receita')}
        />
        {errors.receita && <span>{errors.receita.message}</span>}

        <label>
          <button 
            onClick={addNewInsumo}
            className='btn-addInsumo'
            type="button"
          >
            adicionar Insumos
          </button>
        </label>

        {fields.map((field, index) => (
          <div key={field.id}>
            <input
              className='input-insumos'
              placeholder='Nome do Insumo'
              type='text'
              list='LstInsumos'
              {...register(`insumosQuantidade.${index}.id_insumos`)}
              onChange={(e) => {
                const selectedIndex = insumos.findIndex(insumo => insumo.nome === e.target.value);
                setSelectedInsumoIndex(selectedIndex);
              }}
            />
            <datalist id='LstInsumos'>
              {insumos.map((insumo, index) => (
                <option key={index} value={insumo.nome} data-id={insumo.id} />
              ))}
            </datalist>

            <input 
              type='text' 
              placeholder='0'
              className="input-quantidade"
              {...register(`insumosQuantidade.${index}.quantidade`)}
            />

            <input
              type='text'
              placeholder='Medida'
              className="input-medida"
              {...register(`insumosQuantidade.${index}.unidadeMedida`)}
              value={selectedInsumoIndex !== null && insumos[selectedInsumoIndex] ? insumos[selectedInsumoIndex].unidadeMedida : ''}
              readOnly
            />
          </div>
        ))}

        <button 
          type='submit'
          className="Botao-principal"
        >
          Incluir
        </button>
      </form> 
      <pre>{output}</pre>
    </main>
  );
}
