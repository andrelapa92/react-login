import { Container } from 'react-bootstrap';
import { Input } from 'antd';
import { useNavigate, Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import UsersService from '../service/UsersService';

const Cadastro = () => {

  let navigate = useNavigate();

  const [user, setUser] = useState({
      name: "",
      email: "",
      pass: ""
  });

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
};

  const sendForm = async (e) => {
    e.preventDefault();
    await UsersService.create(user)
    navigate("/login");
  };


  return (
    <>
        <Container>
          <div className="row">
            <div className="col-md-6">
            </div>
            <div className="col-md-6">
              <h6 className='text1 text-center mb-4'>Preencha seus dados:</h6>
              <form onSubmit={e => sendForm(e)}>
                <label htmlFor="name"><strong>Nome</strong></label>
                <Input className='input mt-3 mb-4' name='name' placeholder="Digite seu nome" onChange={(e) => onInputChange(e)} required />
                <label htmlFor="email"><strong>E-mail</strong></label>
                <Input className='input mt-3 mb-4' name='email' placeholder="Digite seu e-mail" onChange={(e) => onInputChange(e)} required />
                <label htmlFor="pass"><strong>Senha</strong></label>
                <Input className='input mt-3 mb-4' name='pass' placeholder="Cadastre uma senha" onChange={(e) => onInputChange(e)} required />
                <div className='text-center'>
                  <button type='submit' className='navlink botao rounded-pill px-5'>Cadastrar</button>
                </div>
              </form>
            </div>
          </div>
        </Container>
      </>
  );
};
  
export default Cadastro;