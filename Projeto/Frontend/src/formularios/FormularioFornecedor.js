import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Container, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { adicionarFornecedor, STATUS } from '../redux/redutores/FornecedorSlice';

export default function FormCadastroFornecedor(props) {
    const [validated, setValidated] = useState(false);


    const { status } = useSelector(state => state.fornecedores);

    const dispatch = useDispatch();

    const [fornecedor, setFornecedor] = useState({
        codigo: "",
        nome: "",
        endereco: "",
        bairro: "",
        cidade: "",
        estado: "",
        cep: "",
        ativo: ""
    });

    const manipulaMudanca = (evento) => {
        if (evento.target.type === "checkbox") {
            setFornecedor({ ...fornecedor, [evento.target.name]: evento.target.checked });
        }
        else {
            setFornecedor({ ...fornecedor, [evento.target.name]: evento.target.value });
        }
    }

    const manipularEnvioDados = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            dispatch(adicionarFornecedor(fornecedor));
            setFornecedor({
                codigo: "",
                nome: "",
                endereco: "",
                bairro: "",
                cidade: "",
                estado: "",
                cep: "",
                ativo: false
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
                    Adicionando Fornecedor..
                </Button>
                <hr />
            </Container>
        );
    } else if (status == STATUS.CARREGADO) {
        return (
            <Form className="m-3 p-3" method='POST' action='/fornecedor' noValidate validated={validated} onSubmit={manipularEnvioDados}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCodigo">
                        <Form.Label>Codigo</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Informe seu Código"
                            defaultValue=""
                            id="codigo"
                            name="codigo"
                            value={fornecedor.codigo}
                            onChange={manipulaMudanca}
                        />
                        <Form.Control.Feedback>OK!</Form.Control.Feedback>
                        <Form.Control.Feedback type='invalid'>Informar o Codigo!</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationNome">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Informe seu Nome"
                            defaultValue=""
                            id="nome"
                            name="nome"
                            value={fornecedor.nome}
                            onChange={manipulaMudanca}
                        />
                        <Form.Control.Feedback>OK!</Form.Control.Feedback>
                        <Form.Control.Feedback type='invalid'>Informar o Nome!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationEndereco">
                        <Form.Label>Endereço</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Informe seu Endereço"
                            defaultValue=""
                            id="endereco"
                            name="endereco"
                            value={fornecedor.endereco}
                            onChange={manipulaMudanca}
                        />
                        <Form.Control.Feedback>OK!</Form.Control.Feedback>
                        <Form.Control.Feedback type='invalid'>Informar o Endereço!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCEP">
                        <Form.Label>CEP</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="CEP"
                            required id="cep"
                            name="cep"
                            value={fornecedor.cep}
                            onChange={manipulaMudanca} />
                        <Form.Control.Feedback>OK!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid"> Please provide a valid CEP.</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationBairro">
                        <Form.Label>Bairro</Form.Label>
                        <Form.Control type="text" placeholder="Bairro" required id="bairro" name="bairro" value={fornecedor.bairro} onChange={manipulaMudanca} />
                        <Form.Control.Feedback type="invalid"> Please provide a valid Bairro.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCidade">
                        <Form.Label>Cidade</Form.Label>
                        <Form.Control type="text" placeholder="Cidade" required id="cidade" name="cidade" value={fornecedor.cidade} onChange={manipulaMudanca} />
                        <Form.Control.Feedback type="invalid"> Please provide a valid city.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationEstado">
                        <Form.Label>Estado</Form.Label>
                        <Form.Control type="text" placeholder="Estado" required id="estado" name="estado" value={fornecedor.estado} onChange={manipulaMudanca} />
                        <Form.Control.Feedback type="invalid"> Please provide a valid State.</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3">
                    <Form.Check
                        label="O fornecedor esta ativo"
                        id="ativo"
                        name="ativo"
                        checked={fornecedor.ativo}
                        onChange={manipulaMudanca}
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
                <p><h2>Houve erro ao tentar cadastrar o fornecedor</h2></p><hr />
                <Button type="button" onClick={() => props.onTabela(true)}>Voltar</Button>
            </Container>
        );
    }
}