import { Container } from 'react-bootstrap';
import { Input } from 'antd';

const Login = () => {
    return (
      <>
        <Container className=''>
          <div className="row">
            <div className="col-md-6">
            </div>
            <div className="col-md-6">
              <h6 className='text1 text-center mb-4'>Digite seu e-mail e sua senha:</h6>
              <label htmlFor="emailInput"><strong>E-mail</strong></label>
              <Input className='mt-3 mb-4' name='emailInput' placeholder="Digite seu e-mail" />
              <label htmlFor="passInput"><strong>Senha</strong></label>
              <Input className='mt-3 mb-4' name='passInput' placeholder="Digite sua senha" />
              <div className='text-center'>
                <button className='navlink botao rounded-pill px-5'>Entrar</button>
              </div>
            </div>
          </div>
        </Container>
      </>
    );
};
  
export default Login;