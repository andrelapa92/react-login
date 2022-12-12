import { Container } from 'react-bootstrap';
import { Input } from 'antd';
import { useNavigate, Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import UsersService from '../service/UsersService';

const Cadastro = () => {

  let navigate = useNavigate();

  const {id} = useParams();

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
    await UsersService.create(id)
    navigate("/users");
  };


  return (
    <>
        <Container>
          <div className="row">
            <div className="col-md-6">
            </div>
            <div className="col-md-6">
              <h6 className='text1 text-center mb-4'>Preencha seus dados:</h6>
              <label htmlFor="name"><strong>Nome</strong></label>
              <Input className='input mt-3 mb-4' name='name' placeholder="Digite seu nome" onChange={(e) => onInputChange(e)} />
              <label htmlFor="email"><strong>E-mail</strong></label>
              <Input className='input mt-3 mb-4' name='email' placeholder="Digite seu e-mail" onChange={(e) => onInputChange(e)} />
              <label htmlFor="pass"><strong>Senha</strong></label>
              <Input className='input mt-3 mb-4' name='pass' placeholder="Cadastre uma senha" onChange={(e) => onInputChange(e)} />
              <div className='text-center'>
                <button className='navlink botao rounded-pill px-5' onClick={e => this.save(e)}>Cadastrar</button>
              </div>
            </div>
          </div>
        </Container>
      </>
  );
};
  
export default Cadastro;