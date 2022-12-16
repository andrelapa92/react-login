import { Container } from 'react-bootstrap';
import { useState, useEffect } from "react";
import UsersService from '../service/UsersService';
import { Table, Button, Modal } from 'antd';
import { Link } from 'react-router-dom';

export default function Admin() {

    const [users, setUsers] = useState();

    const loadUsers = async () => {
        const resultado = await UsersService.getAll();
        setUsers(resultado.data);
    }

    useEffect(() => {
        loadUsers()
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
    }, []);

    //modal Confirm (Ant Design)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUserId, setUserId] = useState();

    const handleClick = async (id) => {
        setIsModalOpen(true)
        setUserId(id);
    };

    const handleOk = async () => {
        await UsersService.delete(isUserId);
        loadUsers();
        setIsModalOpen(false);
    };

    const handleCancel = async () => {
        setIsModalOpen(false);
    };
    
    //Table (Ant Design)
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
                    
                    <Button className='mx-1 botaoDanger' type='primary' danger
                    onClick={() => { handleClick(record.id) }}>Deletar</Button>
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
                    rowKey = { record => record.id }
                    dataSource = { users }
                    columns = { columns }
                    />
                </div>
            </Container>
            <Modal title="Confirmar exclusão"
                open={isModalOpen}
                onOk={() => {
                    handleOk();
                }}
                okText="Excluir"
                cancelText="Cancelar"
                onCancel={() => {
                    handleCancel();
                }}>
                <p>Vecê tem certeza que deseja excluir este usuário?</p>
            </Modal>
        </>

    );

};