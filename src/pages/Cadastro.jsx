import { Container } from 'react-bootstrap';
import { Input, Button, message } from 'antd';
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import UsersService from '../service/UsersService';

export default function Cadastro() {

  let navigate = useNavigate();

  const [user, setUser] = useState({
      nome: "",
      email: "",
      senha: ""
  });

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  //Ant Design - mensagem de cadastro realizado
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Cadastro realizado!',
    });
  };

  const sendForm = async (e) => {
    e.preventDefault();
    await UsersService.create(user);
    success(); //executa mensagem de cadastro realizado
    setTimeout(() => {
      navigate("/login");
    }, "1500")
  };

  return (

    <>
      {contextHolder}
      <Container>
        <div className="row">
          <div className="col-md-6">
          </div>
          <div className="col-md-6">
            <h6 className='text1 text-center mb-4'>Preencha seus dados:</h6>
            <form onSubmit={e => sendForm(e)}>
              <label htmlFor="nome"><strong>Nome</strong></label>
              <Input className='input mt-3 mb-4' name='nome' placeholder="Digite seu nome" onChange={(e) => onInputChange(e)} required />
              <label htmlFor="email"><strong>E-mail</strong></label>
              <Input className='input mt-3 mb-4' name='email' placeholder="Digite seu e-mail" onChange={(e) => onInputChange(e)} required />
              <label htmlFor="senha"><strong>Senha</strong></label>
              <Input type='password' className='input mt-3 mb-4' name='senha' placeholder="Cadastre uma senha" onChange={(e) => onInputChange(e)} required />
              <div className='text-center'>
                <Button htmlType='submit' className='navlink botao rounded-pill px-5'>Cadastrar</Button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </>

  );

};