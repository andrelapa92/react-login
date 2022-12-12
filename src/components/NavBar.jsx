import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";

function CustomNavbar() {
  return (
    <>
      <Navbar className='navbar'>
        <Container>
          <Link to="/" className='navlink rounded-pill justify-content-start'>Home</Link>
        </Container>
        <Container className='d-flex justify-content-end'>
          <Nav>
            <Link to="/login" className='navlink rounded-pill'>Login</Link>
            <div className="vr text-light"></div>
            <Link to="/cadastro" className='navlink rounded-pill'>Cadastro</Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
    </>
  );
}

export default CustomNavbar;