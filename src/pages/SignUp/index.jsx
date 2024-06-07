import { Container, Form, Background } from './style';

import {FiUser, FiMail, FiLock} from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

import { Input } from '../../components/input';
import { Button } from '../../components/button';

import { useState } from 'react';//Hook que de criação de estados.

import { api } from "../../services/api";

export function SignUp () {
  /*const [ variável, funçãoQueAtualizaAVariável] = useState(valorInicial); 
  Isso vai permitir que haja a captura das informações fornecidas pelo usuário*/
  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  const navigate = useNavigate();

  //Função que vai lidar com os useStates.
  function handleSignUp() {
    
    if (!name || !email || !password) {
      
      return alert("Por favor, preencha todos os campos.");
    }

    api.post("/users", { name, email, password})
     .then(() => 
        {
          alert("Usuário cadastrado com sucesso!");
          navigate("/");//Leva o usuário para a tela de login.
        }
      )
      .catch(error => 
        { 
          if (error.response) {
            alert(error.response.data.message);
          }
          else {
            alert("Não foi possível cadastrar o usuário");
          }
        }
      );
  }

  return (
    <Container>

      <Background/>

      <Form>

        <h1>Rocket Notes</h1>
        <p>Aplicação para salvar e gerenciar seus links úteis</p>

        <h2>Crie sua conta</h2>

        <Input
          placeholder="Nome"
          type="text"
          icon={FiUser}
          onChange={event => setName(event.target.value)}
          /* Toda vez que o valor do input for alterado
          a função onChange dispara um evento (event) 
          e o valor é armazenado nele. É possível recuperar esse valor 
          através do comando event.target.value */
        />

        <Input
          placeholder="E-mail"
          type="text"
          icon={FiMail}
          onChange={event => setEmail(event.target.value)}
        />

        <Input
          placeholder="Senha"
          type="password"
          icon={FiLock}
          onChange={event => setPassword(event.target.value)}
        />

        <Button 
          title="Cadastrar" 
          onClick = {handleSignUp}/*Chama função que vai lidar com os useStates*/ 
        />
                                  
        <Link to="/">
          Voltar para o Login
        </Link>

      </Form>

    </Container>
  )
}
