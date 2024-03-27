import { useEffect, useState } from 'react';
import '../App.css';
import './Receitas.css';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import '../font.css';

const verificarUserSchema = z.object({
  nome: z.string(),
  insumoQuantidade: z.array(z.object({
    quantidade: z.string(),
    insumo: z.object({
      id: z.string(),
    })
  }))
});

type VerificaUserFormData = z.infer<typeof verificarUserSchema>;

export function Receitas() {
  const [output, setOutput] = useState('');
  const [insumos, setInsumos] = useState([{ id: 0, nome: '', unidadeMedida: '' }]);
  const [image, setImage] = useState('');
  const [preview, setPreview] = useState('');

  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset,
    control,
  } = useForm<VerificaUserFormData>({
    resolver: zodResolver(verificarUserSchema)
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'insumoQuantidade',
  });

  useEffect(() => {
    // Busca os insumos do banco de dados
    fetch("http://localhost:8080/api/insumos/listar")
      .then((retorno) => retorno.json())
      .then((retorno_convertido) => setInsumos(retorno_convertido))
      .catch((error) => console.error('Erro ao buscar insumos:', error));
  }, []);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (!selectedImage) {
      setImage('');
      setPreview('');
      return;
    }
    setImage(selectedImage);
    const imageURL = URL.createObjectURL(selectedImage);
    setPreview(imageURL);
  };

  async function verificarUser(data: VerificaUserFormData) {
    try {
      const formData = new FormData();
      formData.append('nome', data.nome);
      formData.append('foto', image);
      formData.append('insumoQuantidade', JSON.stringify(data.insumoQuantidade));

      const response = await fetch('http://localhost:8080/api/receitas', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar os dados para a API');
      }

      setOutput('Receita cadastrada com sucesso');
      reset(); // Limpar os campos do formulário
      setPreview('');
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      setOutput('Erro ao enviar os dados para a API');
    }
  }

  function addNewInsumo() {
    append({ insumo: { id: '' }, quantidade: '' });
  }

  function removeInsumo(indexToRemove: number) {
    remove(indexToRemove);
  }

  return (
    <main className="Container-insumo">
      <form className="form-login" autoComplete='off' onSubmit={handleSubmit(verificarUser)}>
        <input 
          type='text' 
          placeholder='Nome da Receita'
          className="input-nome-receita"
          {...register('nome')}
        />
        {errors.nome && <span>{errors.nome.message}</span>}

        <div>
          <label className='span-foto' htmlFor='foto'>
            {preview && (
              <img
                src={preview}
                alt="Preview"
                style={{ maxWidth: '100%', maxHeight: '200px' }}
              />
            )}
          </label>
          <input 
            type='file'
            accept='image/*'
            className='foto'
            id='foto'
            onChange={handleImageChange}
          />
        </div>

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
            <select
              className='input-insumos'
              {...register(`insumoQuantidade.${index}.insumo.id`)}
            >
              {insumos.map((opInsumo, idx) => (
                <option key={idx} value={opInsumo.id}>
                  {opInsumo.nome} - {opInsumo.unidadeMedida}
                </option>
              ))}
            </select>
            <input
              type='text'
              placeholder='0'
              className="input-quantidade"
              {...register(`insumoQuantidade.${index}.quantidade`)}
            />
              <button className='button-remover' onClick={() => removeInsumo(index)}> - </button>
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
