import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Admin from './pages/Admin';
import NoPage from './pages/NoPage';
import EditUser from './pages/EditUser';

export default function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Layout />}>
            <Route index element = {<Home />} />
            <Route path = "login" element = {<Login />} />
            <Route path = "cadastro" element = {<Cadastro />} />
            <Route path = "cadastro/:id" element = {<EditUser />} />
            <Route path = "admin" element = {<Admin />} />
            <Route path = "*" element = {<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
