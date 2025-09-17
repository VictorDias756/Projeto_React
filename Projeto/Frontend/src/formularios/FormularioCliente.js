import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Container, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { adicionarCliente, STATUS } from '../redux/redutores/ClientesSlice';

export default function FormCadastroCliente(props) {

    const [validated, setValidated] = useState(false);

    const { status } = useSelector(state => state.clientes)

    //despacha ações para os redutores da store
    const dispatch = useDispatch();

    const [cliente, setCliente] = useState({
        cpf: "",
        nome: "",
        sobrenome: "",
        endereco: "",
        cidade: "",
        estado: "",
        cep: ""
    });

    const manipulaMudanca = (evento) => {
        setCliente({ ...cliente, [evento.target.name]: evento.target.value });
    }

    const manipularEnvioDados = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            //ação clientes/adicionar payload:cliente
            dispatch(adicionarCliente(cliente));
            setCliente({
                cpf: "",
                nome: "",
                sobrenome: "",
                endereco: "",
                cidade: "",
                estado: "",
                cep: ""
            });
            setValidated(false);
        }
        else {
            setValidated(true);
        }
        event.preventDefault();
        event.stopPropagation();
    };

    if (status === STATUS.OCIOSO) {
        return (
            <Container>
                <Button variant="primary" disabled>
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                    Adicionando Clientes..
                </Button>
                <hr />
            </Container>
        );
    }
    else if (status === STATUS.CARREGADO) {
        return (
            <Form className="m-3 p-3" method='POST' action='/cliente' noValidate validated={validated} onSubmit={manipularEnvioDados}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCodigo">
                        <Form.Label>CPF</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Informe seu CPF"
                            defaultValue=""
                            id="cpf"
                            name="cpf"
                            value={cliente.cpf}
                            onChange={manipulaMudanca}
                        />
                        <Form.Control.Feedback>OK!</Form.Control.Feedback>
                        <Form.Control.Feedback type='invalid'>Informar o CPF!</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Informe seu Nome"
                            defaultValue=""
                            id="nome"
                            name="nome"
                            value={cliente.nome}
                            onChange={manipulaMudanca}
                        />
                        <Form.Control.Feedback>OK!</Form.Control.Feedback>
                        <Form.Control.Feedback type='invalid'>Informar o nome!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                        <Form.Label>Sobrenome</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Informe seu Sobrenome"
                            defaultValue=""
                            id="sobrenome"
                            name="sobrenome"
                            value={cliente.sobrenome}
                            onChange={manipulaMudanca}
                        />
                        <Form.Control.Feedback>OK!</Form.Control.Feedback>
                        <Form.Control.Feedback type='invalid'>Informar o Sobrenome!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCidade">
                        <Form.Label>Cidade</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Cidade"
                            id="cidade"
                            name="cidade"
                            value={cliente.cidade}
                            onChange={manipulaMudanca} />
                        <Form.Control.Feedback>OK!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid"> Please provide a valid city.</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">

                    <Form.Group as={Col} md="6" controlId="validationEndereco">
                        <Form.Label>Endereço</Form.Label>
                        <Form.Control required type="text" placeholder="Informe seu Endereço" defaultValue="" name="endereco" value={cliente.endereco} onChange={manipulaMudanca} />
                        <Form.Control.Feedback type='invalid'>Informar o Endereço!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationEstado">
                        <Form.Label>Estado</Form.Label>
                        <Form.Control type="text" placeholder="Estado" required id="estado" name="estado" value={cliente.estado} onChange={manipulaMudanca} />
                        <Form.Control.Feedback type="invalid"> Please provide a valid State.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCEP">
                        <Form.Label>CEP</Form.Label>
                        <Form.Control type="text" placeholder="CEP" required id="cep" name="cep" value={cliente.cep} onChange={manipulaMudanca} />
                        <Form.Control.Feedback type="invalid"> Please provide a valid CEP.</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3">
                    <Form.Check
                        required
                        label="Agree to terms and conditions"
                        feedback="You must agree before submitting."
                        feedbackType="invalid"
                    />
                </Form.Group>
                <Button type="submit">Cadastrar</Button><hr />
                <Button type="button" onClick={() => props.onTabela(true)}>Voltar</Button>
            </Form>
        );
    }
    else if (status === STATUS.ERRO) {
        return (
            <Container>
                <p><h2>Houve erro ao tentar cadastrar o cliente</h2></p><hr />
                <Button type="button" onClick={() => props.onTabela(true)}>Voltar</Button>
            </Container>
        );
    }
}