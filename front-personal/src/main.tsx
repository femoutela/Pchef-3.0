import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter,RouterProvider } from "react-router-dom";

import { Cadastro } from './cliente/Cadastro.tsx';
import { FazerPedido } from './cliente/FazerPedido.tsx';
import { Login } from './Login.tsx';
import Agenda from './Chefe/Agenda.tsx';
import { Insumos } from './Chefe/Insumos.tsx';
import { Receitas } from './Chefe/Receitas.tsx';
import { CadastroSucesso } from './cliente/CadastroSucesso.tsx';




const router = createBrowserRouter([
{
  path: '/',
  element: <App />,
  children: [
    { path: "/", element: <Login/>},
    { path: "/cadastro", element: <Cadastro />},
    { path: "/pedido", element: <FazerPedido />},
    {path: "/agenda", element:<Agenda></Agenda>},
    {path: "/insumos", element:<Insumos></Insumos>},
    {path: "/receitas", element:<Receitas></Receitas>},
    {path: "/CadastroSucesso", element:<CadastroSucesso></CadastroSucesso>}
    

  ],
},

]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
