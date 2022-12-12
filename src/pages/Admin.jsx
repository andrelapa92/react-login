import { Container } from 'react-bootstrap';
import { useState, useEffect } from "react";
import UsersService from '../service/UsersService';
import { Table, Button } from 'antd';
import { Link } from 'react-router-dom';

export default function Admin() {

    const [users, setUsers] = useState();

    const loadUsers = async () => {
        const resultado = await UsersService.getAll();
        setUsers(resultado.data);
    }

    const removeUser = async (id) => {
        await UsersService.delete(id);
        loadUsers();
    }

    useEffect(() => {
        loadUsers()
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
    }, []);
    
    const columns = [ 
        {
            title : 'Nome' , 
            dataIndex : 'name' , 
            key : 'name' , 
        },
        {
            title : 'E-mail' , 
            dataIndex : 'email' , 
            key : 'email' , 
        },
        {
            title : 'Ações' , 
            dataIndex : '' ,
            key : 'x' ,
            render : (record) => (
                    <>
                        <Link to={`/cadastro/${record.id}`}>
                            <Button className='mx-1 botao navlink'>Editar</Button>
                        </Link>
                        
                        <Button className='mx-1' type='primary' danger
                        onClick={() => removeUser(record.id)}>Deletar</Button>
                    </>
                )
        }
    ];

    return (

        <>
            <Container>
                <h1 className='display-6 text-center mb-3'>Administrar usuários</h1>
                <div>
                    <Table
                    rowKey = { record => record.id } dataSource = { users } columns = { columns } />
                </div>
            </Container>
        </>

    );

};