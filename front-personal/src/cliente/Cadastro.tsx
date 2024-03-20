import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import '../App.css';
import './Cadastro.css';
import { useNavigate } from 'react-router-dom'; // Importe useNavigate em vez de useHistory


const inserirUserSchema = z.object({
  nome: z.string().nonempty('Nome é obrigatorio'),
  email: z.string().nonempty('O e-mail é obrigatorio').email('Formato de email inválido'),
  password: z.string().min(6, 'A senha precisa de no mínimo 6 caracteres'),
  cpf: z.string().nonempty('cpf é obrigatorio'),
  bairro: z.string().nonempty('Bairro é obrigatorio'),
  cidade: z.string().nonempty('Cidade é obrigatorio'),
  estado: z.string().nonempty('Estado é obrigatorio'),
  DataNasc: z.string().nonempty('DT Nascimento é obrigatorio'),
  endereço: z.string().nonempty('Nome é obrigatorio'),
  restriçao: z.string().nonempty('Resposta obrigatoria'),
  alimetosRestritos: z.string().optional(),
  notProteina: z.string().optional(),
  proteinaRestrita: z.string().optional(),
  notTempero: z.string().optional(),
  introduzir: z.string().optional(),
  preferencia: z.string().optional(),
  restricaoLeite: z.string().optional(),
  typeRestricaoLeite: z.string().optional(),
  acompanhamentoNutricional: z.string().optional(),
  

})

type VerificaUserFormData = z.infer<typeof inserirUserSchema>;

export function Cadastro() {
  const navigate = useNavigate(); // Instância de useNavigate para navegação programática
  const [output, setOutput] = useState('');
  const [exibirCamposAdicionais, setExibirCamposAdicionais] = useState(false);
  const [exibirCamposAdicionaisleite, setExibirCamposAdicionaisleite] = useState(false);
  const [exibirCamposAdicionaisproteina, setExibirCamposAdicionaisproteina] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<VerificaUserFormData>({
    resolver: zodResolver(inserirUserSchema)
  });

  async function verificarUser(data: VerificaUserFormData) {
    try {
      const response = await fetch('http://localhost:8080/api/cliente/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const responseData = await response.json();
        // Redirecionar para uma nova página e passar os dados do usuário como parâmetro de consulta
        navigate(`/cadastro-sucesso?${new URLSearchParams(responseData).toString()}`);
      } else {
        const responseData = await response.json();
        setOutput(responseData.message || 'Erro ao cadastrar o cliente.');
      }
    } catch (error) {
      console.error('Erro ao cadastrar o cliente:', error);
      setOutput('Erro ao cadastrar o cliente.');
    }
  }

  return (

    <main className="main-cadastro">
      <form
        onSubmit={handleSubmit(verificarUser)}
        className='form-cadastro' >

        <div className='titulo'>
          <h2>Seja bem vindo ao </h2><h1>
            Personal Chef Alê Farias</h1>
          <p>Cadastre seus dados para continuar.</p>
        </div><br></br>
     
        <label>Nome</label>
        <input type='text' className='input-cadastro'
          {...register('nome')}/>  
        {errors.nome && <span>{errors.nome.message}</span>}

        <label>CPF</label>  
        <input type='cpf' className='input-cadastro'
          {...register('cpf')} />
        {errors.cpf && <span>{errors.cpf.message}</span>}
        
        <label>Data de Nascimento</label>
        <input type='date' className='input-cadastro'
          {...register('DataNasc')} />
        {errors.DataNasc && <span>{errors.DataNasc.message}</span>}

        <label>Email</label> 
        <input type='email' className='input-cadastro'
          {...register('email')} />
        {errors.email && <span>{errors.email.message}</span>}

        <label>Endereço</label> 
        <input type='text' className='input-cadastro'
          {...register('endereço')}/>
        {errors.endereço && <span>{errors.endereço.message}</span>}

        <label>Bairro</label>
        <input type='bairro' className='input-cadastro'
          {...register('bairro')}/>
        {errors.bairro && <span>{errors.bairro.message}</span>}

        <label>Cidade</label>
        <input type='text' className='input-cadastro'
          {...register('cidade')} />
        {errors.cidade && <span>{errors.cidade.message}</span>}

        <label>Estado</label>
        <input type='text' className='input-cadastro'
          {...register('estado')}  />

        <label>Senha</label>
        <input type='password' className='input-cadastro'  autoComplete="on"
        {...register('password')} />
        {errors.password && <span>{errors.password.message}</span>}

        <label>Tem restrição a algum alimento?</label>
        <select className='input-cadastro' {...register('restriçao')} onChange={(e) => setExibirCamposAdicionais(e.target.value === 'sim')}>
           <option value="não">Não</option>
          <option value="sim">Sim</option>
        </select>
  
        {exibirCamposAdicionais && (
          <>
        <label>Tem restrição ao leite?</label>
        <select className='input-cadastro' {...register('restricaoLeite')} onChange={(e) => setExibirCamposAdicionaisleite(e.target.value === 'sim')}>
           <option value="não">Não</option>
          <option value="sim">Sim</option>
        </select>

        
                {exibirCamposAdicionaisleite && (
                 <>
                   <label>Restrição a proteína do leite ou apenas lactose?</label>
                   <select className='input-cadastro' {...register('typeRestricaoLeite')} >
                   <option value="Proteína do leite">Proteína do leite</option>
                   <option value="Somente Lactose">Somente Lactose</option>
                   </select>
                  </>
                   )}
       
        <label>Alguma proteina restrita?</label>
        <select className='input-cadastro' {...register('notProteina')} onChange={(e) => setExibirCamposAdicionaisproteina(e.target.value === 'sim')}>
           <option value="não">Não</option>
          <option value="sim">Sim</option>
        </select>
      

        {exibirCamposAdicionaisproteina && (
                 <>
                <label>Qual Proteina tem restrição?</label>
                <input type='text' className='input-cadastro' 
                  {...register('proteinaRestrita')} />      
        
        </>
                   )}

        <label>Algum tempero que não consuma? (pimenta, cominho, salsa…)</label>
        <input type='text'className='input-cadastro'
        {...register('notTempero')}/>

        <label>Alimentos restritos:</label>
        <input type='text' className='input-cadastro'
          {...register('alimetosRestritos')}/>


</>
        )}

        <label>Gostaria de tentar introduzir algum alimento 
        que não goste muito ou que nunca provou? Qual?</label>
        <input type='text' className='input-cadastro'
          {...register('introduzir')}/>

     
        <label>Tem preferência de algum tipo de cardápio específico? (vegano, low carb…)</label>
        <input type='text' className='input-cadastro'
          {...register('preferencia')}
        />

        <label>Faz acompanhamento nutricional?</label>
        <select className='input-cadastro'{...register('acompanhamentoNutricional')} >
           <option value="não">Não</option>
          <option value="sim">Sim</option>
        </select>
    
       
          <div className="envio">
            
                <label
>
                  Envie sua receita Nutricional 
                  <br></br><br></br>
                   <input id="file-upload"   name="file-upload" type="file" />
                  <br></br>(PNG, JPG, GIF up to 10MB):
                </label>

              </div> 

        <button
          type='submit'
          className='Botao-cadastro'
        >
          Salvar</button>
        </form>
      <pre>{output}</pre>
    </main>
  )
}


