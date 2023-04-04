import { Container } from 'react-bootstrap';
import { Input, Button } from 'antd';
import UsersService from '../service/UsersService';
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

export default function Login() {

  let navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    senha: ""
  });

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const sendForm = async (e) => {
    e.preventDefault();
    try {
      const response = await UsersService.login(user);
      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate("/admin");
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            document.getElementById("error-text").textContent = "Usuário ou senha incorretos.";
            break;
          
          default:
            document.getElementById("error-text").textContent = "Erro desconhecido. Tente novamente mais tarde.";
            break;
        }
      } else {
        console.log("Erro na requisição:", error);
      }
    }
  };

  return (
    <>
      <Container className=''>
        <div className="row">
          <div className="col-md-6">
          </div>
          <div className="col-md-6">
            <form onSubmit={e => sendForm(e)}>
              <h6 className='text1 text-center mb-4'>Digite seu e-mail e sua senha:</h6>
              <label htmlFor="email"><strong>E-mail</strong></label>
              <Input className='mt-3 mb-4' name='email' placeholder="Digite seu e-mail" onChange={(e) => onInputChange(e)} required />
              <label htmlFor="senha"><strong>Senha</strong></label>
              <Input className='mt-3 mb-4' name='senha' type='password' placeholder="Digite sua senha" onChange={(e) => onInputChange(e)} required />
              <p id='error-text' className='text-danger'></p>
              <div className='text-center'>
                <Button htmlType='submit' className='navlink botao rounded-pill px-5'>Entrar</Button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </>
  );

}