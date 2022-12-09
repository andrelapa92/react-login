import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";

function CustomNavbar() {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Link to="/" className='text-light navlink rounded-pill justify-content-start'>Home</Link>
        </Container>
        <Container className='d-flex justify-content-end'>
          <Nav>
            <Link to="/login" className='text-light navlink rounded-pill'>Login</Link>
            <div className="vr text-light"></div>
            <Link to="/cadastro" className='text-light navlink rounded-pill'>Cadastrar usuário</Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
    </>
  );
}

export default CustomNavbar;