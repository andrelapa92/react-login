import { Container } from 'react-bootstrap';
import { useState, useEffect } from "react";
import UsersService from '../service/UsersService';
import { Table, Button, Modal, Spin, Alert } from 'antd';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function Admin() {

    let navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    const loadUsers = async (token) => {
        try {
            const resultado = await UsersService.admin(token);
            setUsers(resultado.data.users);
            setLoading(false);
        } catch (err) {
            console.error("Ops! Ocorreu um erro: " + err);
            setLoading(false);
            setError("Ops! Ocorreu um erro ao carregar os usuários.");
            navigate("/login");
        }
    }

    useEffect(() => {
        loadUsers(token);
    }, [token]);

    //modal Confirm (Ant Design)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUserId, setUserId] = useState();

    const handleClick = async (id) => {
        setIsModalOpen(true);
        setUserId(id);
    };

    const handleOk = async () => {
        await UsersService.delete(isUserId);
        loadUsers(token);
        setIsModalOpen(false);
    };

    const handleCancel = async () => {
        setIsModalOpen(false);
    };
    
    //Table (Ant Design)
    const columns = [ 
        {
            title : 'Nome' , 
            dataIndex : 'nome' , 
            key : 'nome' , 
        },
        {
            title : 'E-mail' , 
            dataIndex : 'email' , 
            key : 'email' , 
        },
        {
            title : 'Senha' , 
            dataIndex : 'senha' , 
            key : 'senha' , 
        },
        {
            title : 'Ações' , 
            dataIndex : '' ,
            key : 'x' ,
            render : (record) => (
                <>
                    <Link to={`/cadastro/${record.id}`}>
                        <Button className='mx-1 botao navlink my-1'>Editar</Button>
                    </Link>
                    
                    <Button className='mx-1 botaoDanger my-1' type='primary' danger
                    onClick={() => { handleClick(record.id) }}>Deletar</Button>
                </>
            )
        }
    ];

    if (loading) {
        return (
            <Spin size="large" style={{ marginTop: 50 }} />
        );
    }

    if (error) {
        return (
            <Alert message={error} type="error" style={{ marginTop: 50 }} />
        );
    }

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
                <p>Você tem certeza que deseja excluir este usuário?</p>
            </Modal>
        </>

    );

};