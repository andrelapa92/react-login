import { Container } from 'react-bootstrap';
import { Input, Button } from 'antd';
import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import UsersService from '../service/UsersService';

export default function EditUser() {

    const {id} = useParams();

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
    await UsersService.update(id, user)
    navigate("/admin");
    };

    const loadUser = async() => {
        const result = await UsersService.get(id)
        setUser(result.data);
      }

    useEffect(() => {
        loadUser();
    }, []);

    return (

    <>
        <Container>
            <div className="row">
            <div className="col-md-6">
            </div>
            <div className="col-md-6">
                <h6 className='text1 text-center mb-4'>Altere os dados do usuário:</h6>
                <form onSubmit={e => sendForm(e)}>
                <label htmlFor="name"><strong>Nome</strong></label>
                <Input className='input mt-3 mb-4' name='name' placeholder="Digite o nome" onChange={(e) => onInputChange(e)} required value={user.name} />
                <label htmlFor="email"><strong>E-mail</strong></label>
                <Input className='input mt-3 mb-4' name='email' placeholder="Digite o e-mail" onChange={(e) => onInputChange(e)} required value={user.email} />
                <label htmlFor="pass"><strong>Senha</strong></label>
                <Input className='input mt-3 mb-4' name='pass' placeholder="Cadastre uma senha" onChange={(e) => onInputChange(e)} required value={user.pass} />
                <div className='text-center'>
                    <Button type='submit' className='navlink botao rounded-pill px-5'>Salvar</Button>
                    <Button danger className='rounded-pill px-5'>Cancelar</Button>
                </div>
                </form>
            </div>
            </div>
        </Container>
        </>

    );

};