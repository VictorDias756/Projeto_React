import Pagina from "../templates/Pagina";
import { useContext } from "react";
import { LinkContainer } from "react-router-bootstrap";
import Button from 'react-bootstrap/Button';
import ContextoUsuario from "../contextos/ContextoGlobal";
import avatarNL from "../imagens/avatarNL.png";

export default function TelaMenu(props) {

    const [usuario,setUsuario]=useContext(ContextoUsuario);

    return (
        <Pagina>
            <h2>Seja bem vindo ao sistema de geranciamento</h2>
            <LinkContainer to="/cadCliente" className="mx-3"><Button type="button"> Cliente </Button></LinkContainer>
            <LinkContainer to="/cadFornecedor" className="mx-3"><Button type="button"> Fornecedor </Button></LinkContainer>
            <LinkContainer to="/cadProduto" className="mx-3"><Button type="button"> Produto </Button></LinkContainer>
            <LinkContainer to="/Loja" className="mx-3"><Button type="button"> Loja </Button></LinkContainer>
            <LinkContainer to="/"><Button className="mx-3" onClick={() => { setUsuario({ ...usuario, logado: false, nome: "", avatar: avatarNL }); }} type="button">Logout</Button></LinkContainer>
        </Pagina>
    );
}