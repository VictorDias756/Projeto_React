import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext } from "react";
import ContextoUsuario from "../../contextos/ContextoGlobal";
import avatarNL from "../../imagens/avatarNL.png";

export default function Menu(props) {

    const[usuario,setUsuario]=useContext(ContextoUsuario);

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <LinkContainer to="/"><Navbar.Brand>MENU</Navbar.Brand></LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Cadastro" id="basic-nav-dropdown">
                            <LinkContainer to="/cadCliente"><NavDropdown.Item> Cliente </NavDropdown.Item></LinkContainer>
                            <NavDropdown.Divider />
                            <LinkContainer to="/cadFornecedor"><NavDropdown.Item> Fornecedor </NavDropdown.Item></LinkContainer>
                            <NavDropdown.Divider />
                            <LinkContainer to="/cadProduto"><NavDropdown.Item> Produto </NavDropdown.Item></LinkContainer>
                            <NavDropdown.Divider />
                            <LinkContainer to="/"><NavDropdown.Item onClick={() => { setUsuario({ ...usuario, logado: false, nome: "", avatar: avatarNL }); }}>Logout</NavDropdown.Item></LinkContainer>
                        </NavDropdown>
                        <NavDropdown title="Loja" id="basic-nav-dropdown">
                            <LinkContainer to="/Loja"><NavDropdown.Item> Loja </NavDropdown.Item></LinkContainer>
                            <NavDropdown.Divider />
                            <LinkContainer to="/Venda"><NavDropdown.Item> Venda Produtos </NavDropdown.Item></LinkContainer>
                        </NavDropdown>
                        
                        <LinkContainer to="/"><Nav.Link onClick={() => { setUsuario({ ...usuario, logado: false, nome: "", avatar: avatarNL }); }}>Logout </Nav.Link></LinkContainer>
                    </Nav>
                </Navbar.Collapse>
                
            </Container>
        </Navbar>
    );
}