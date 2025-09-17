import { Container } from "react-bootstrap";
import { useContext } from "react";
import { LinkContainer } from "react-router-bootstrap";
import Button from 'react-bootstrap/Button';
import ContextoUsuario from "../../contextos/ContextoGlobal";
import avatarNL from "../../imagens/avatarNL.png";

export default function Cabecalho(props) {

    const [usuario, setUsuario] = useContext(ContextoUsuario);

    return (
        <Container className="border text-center">
            <h2>{props.titulo || "Sistema de gerenciamento"}</h2>
            <div>
                <LinkContainer to="/"><Button onClick={() => { setUsuario({ ...usuario, logado: false, nome: "", avatar: avatarNL }); }} type="button">Logout</Button></LinkContainer>
                <img style={{ height: "3em", width: "3em", margin: "15px" }} src={usuario.avatar} />
                <span><strong>Usuario:</strong> {usuario.nome} </span>
            </div>
        </Container>
    );
}