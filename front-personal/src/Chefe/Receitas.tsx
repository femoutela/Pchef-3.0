import React, { useEffect, useState } from 'react';
import '../App.css';
import './Receitas.css';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import '../font.css';

const verificarUserSchema = z.object({
  nome: z.string(),
  foto: z.instanceof(FileList).transform(list => list.item(0)),
  insumoQuantidade: z.array(z.object({
    quantidade: z.string(),
    insumo: z.array(z.object({
      id: z.string(),
    }))
  }))
});

type VerificaUserFormData = z.infer<typeof verificarUserSchema>;

export function Receitas() {
  const [output, setOutput] = useState('');
  const [insumos, setInsumos] = useState([{ id: 0, nome: '', unidadeMedida: '' }]);

  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    control,
  } = useForm<VerificaUserFormData>({
    resolver: zodResolver(verificarUserSchema)
  });

  const { fields, append } = useFieldArray({
    control,
    name: 'insumoQuantidade',
  });

  function verificarUser(data: VerificaUserFormData) {
    console.log(data.foto); // Verifica os dados recebidos
    setOutput(JSON.stringify(data, null, 2));
  }

  function addNewInsumo() {
    append({ insumo: [{ id: '' }], quantidade: '' });
  }

  useEffect(() => {
    // Busca os insumos do banco de dados
    fetch("http://localhost:8080/api/insumos/listar")
      .then((retorno) => retorno.json())
      .then((retorno_convertido) => setInsumos(retorno_convertido))
      .catch((error) => console.error('Erro ao buscar insumos:', error));
  }, []);

  const [image, setImage] = useState('');
  const [preview, setPreview] = useState('');

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

  return (
    <main className="Container-insumo">
      <form className="form-login" onSubmit={handleSubmit(verificarUser)}>
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
          <input {...register('foto')}
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
      {...register(`insumoQuantidade.${index}.insumo.0.id`)}
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
