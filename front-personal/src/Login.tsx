import { useState } from 'react';
import './App.css';
import logo from './assets/logo.png';
import linha from './assets/Line 1 (1).png';
import iWhat from './assets/Group 1.png';
import iInst from './assets/inst.png';
import iFace from './assets/Group 3.png';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import './font.css';

const verificarUserSchema = z.object({
  email: z.string()
  .nonempty('O e-mail é obrigatorio').email('Formato de email inválido'),

  password: z.string(),

})

  type VerificaUserFormData = z.infer<typeof verificarUserSchema>

export function Login() {
   const [output, setOutput ] = useState('');
  
   const { 
    register, 
    handleSubmit, 
    formState:{errors} 
      
  } = useForm<VerificaUserFormData>({
      resolver: zodResolver(verificarUserSchema)
    });

    function verificarUser(data: unknown) {
      setOutput(JSON.stringify(data,null,2));
    }


  return (
  
      <main className="Container">
       <div className="logo"> 
                <img src={logo} alt="logo"/> 
             </div>
   

      <form className="form-login"
          onSubmit={handleSubmit(verificarUser)} >
          
             

      
          <input 
              type='email' 
              placeholder='Email'
              className="input-login"
              {...register('email')}
              />
              {errors.email && <span>{errors.email.message}</span>}

         

         
          <input 
               
               type='password' 
               placeholder='Senha'
               className='input-login'
               autoComplete='on'
               {...register('password')}
               
            />
                {errors.password && <span>{errors.password.message}</span>}
             
             
          <button 
             type='submit'
             className="Botao-principal">
             Entrar</button>
             
           
           
      </form>

      <p className='p-login'>Não tem uma conta? &nbsp;
      <Link to="/Cadastro" className='p-link'>
      Criar conta</Link></p>

      <div> 
              
                <img src={linha} alt=""/> 
             </div>

             <div className="icones"> 
                <a href="https://wa.me/5521969785282"><img src={iWhat} alt=""/> </a>
                <a href="https://www.instagram.com/_ale_farias/"><img src={iInst} alt=""/> </a>
                <a><img src={iFace} alt=""/> </a>
             </div>

      <pre>{output}</pre>
    </main>
  )
}


