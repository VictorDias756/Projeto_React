import Menu from "./componentes/menu";
import Cabecalho from "./componentes/Cabecalho";
import { Container } from "react-bootstrap";

export default function Pagina(props){
    return(
        <Container>
            <Cabecalho titulo="Sistema de gestão"/>
            <Menu/>
            <div>
                {props.children}
            </div>
        </Container>
    );
}