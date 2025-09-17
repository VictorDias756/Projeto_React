import { Container, Form, Button } from "react-bootstrap";
import { useContext, useState } from "react";
import ContextoUsuario from "../contextos/ContextoGlobal";
import avatarLogado from '../imagens/avatar.png'

export default function FormLogin(props) {

    const [usuario, setUsuario] = useContext(ContextoUsuario);

    const[dadoslogin, setDadosLogin] = useState({
        usuario:"",
        senha:"",
    });

    function manipulaMudanca(e){
        setDadosLogin({ ...dadoslogin, [e.target.name]: e.target.value });
    }

    function login() {
        if(dadoslogin.senha === "123"){
            setUsuario({
                nome: dadoslogin.usuario,
                avatar: avatarLogado,
                logado: true
            });
        }
    }

    return (
        <Container className="justify-content-center align-items-center" >
            <Form>
                <Form.Group className="mb-3"  md="4">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control type="text" placeholder="Enter Usuario" id="usuario" name="usuario" 
                                  value={dadoslogin.usuario} onChange={manipulaMudanca}/>
                </Form.Group>

                <Form.Group className="mb-3"  md="4">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control type="password" placeholder="Password" id="senha" name="senha" 
                                  value={dadoslogin.senha} onChange={manipulaMudanca}/>
                </Form.Group>
                <Button onClick={login} variant="primary" type="button">
                    Login
                </Button>
            </Form>
        </Container>
    );
}