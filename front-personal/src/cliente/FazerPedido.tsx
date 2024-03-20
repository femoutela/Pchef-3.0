import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import '../App.css';





const inserirUserSchema = z.object({
   nome: z.string()
  .nonempty('Nome é obrigatorio'),
  
    email: z.string()
  .nonempty('O e-mail é obrigatorio')
  .email('Formato de email inválido'),

  password: z.string()
  .min(6, 'A senha precisa de no mínimo 6 caracteres'),

  cpf: z.string()
  .nonempty('cpf é obrigatorio'),

  bairro: z.string()
  .nonempty('Bairro é obrigatorio'),

  cidade: z.string()
  .nonempty('Cidade é obrigatorio'),

  Estado: z.string()
  .nonempty('Estado é obrigatorio'),

  DataNasc: z.string()
  .nonempty('Data de Nascimento é obrigatorio'),

  endereço: z.string()
  .nonempty('Nome é obrigatorio'),

})

  type VerificaUserFormData = z.infer<typeof inserirUserSchema>

export function FazerPedido() {
   const [output, setOutput ] = useState('');
  
   const { 
    register, 
    handleSubmit, 
    formState:{errors} 
      
  } = useForm<VerificaUserFormData>({
      resolver: zodResolver(inserirUserSchema)
    });

    function verificarUser(data: unknown) {
      setOutput(JSON.stringify(data,null,2));
    }


  return (
  
      <main className="h-screen bg-zinc-950 text-zinc-300 flex flex-col gap-10 items-center justify-center">
       
   
 
      <form 
          onSubmit={handleSubmit(verificarUser)}
         className="flex flex-col gap-6 w-full max-w-xs" >
        
   

          <div className="flex flex-col gap-4">
            
            <p> data do pedido</p>
             <input 
               type='date' 
               placeholder='data do pedido'
               className="border border-zinc-200 shadow-sm rounded h-8 px-3 bg-zinc-800  text-white"
               {...register('bairro')}
              
               />
               {errors.bairro && <span>{errors.bairro.message}</span>}
           
          </div> 

          

          <button 
             type='submit'
             className="bg-emerald-500 rounded font-semibold text-white h-10 hover:bg-emerald-600 "
              >
             Salvar</button>
      </form>
      <pre>{output}</pre>
    </main>
  )
}


