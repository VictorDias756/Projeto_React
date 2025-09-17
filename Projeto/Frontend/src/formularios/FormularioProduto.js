import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Container, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { adicionarProduto, STATUS } from '../redux/redutores/ProdutosSlice';

export default function FormCadastroProduto(props) {
    const [validated, setValidated] = useState(false);

    const dispatch = useDispatch();

    const { status } = useSelector(state => state.produtos)

    const [produto, setProduto] = useState({
        codigo: "",
        descricao: "",
        validade: "",
        preco_custo: "",
        preco_venda: "",
        estoque: "",
        cod_barra: "",
    });

    const manipulaMudanca = (evento) => {
        setProduto({ ...produto, [evento.target.name]: evento.target.value });
    }

    const manipularEnvioDados = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            dispatch(adicionarProduto(produto));
            setProduto({
                codigo: "",
                descricao: "",
                validade: "",
                preco_custo: "",
                preco_venda: "",
                estoque: "",
                cod_barra: "",
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
                    Adicionando Produtos..
                </Button>
                <hr />
            </Container>
        );
    }
    else if (status === STATUS.CARREGADO) {
        return (
            <Form className="m-3 p-3" method='POST' action='/produto' noValidate validated={validated} onSubmit={manipularEnvioDados}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCodigo">
                        <Form.Label>Código</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Informe seu Código"
                            defaultValue=""
                            id="codigo"
                            name="codigo"
                            value={produto.codigo}
                            onChange={manipulaMudanca}
                        />
                        <Form.Control.Feedback>OK!</Form.Control.Feedback>
                        <Form.Control.Feedback type='invalid'>Informar o Codigo!</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="5" controlId="validationDescricao">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Informe a descrição do produto"
                            defaultValue=""
                            id="descricao"
                            name="descricao"
                            value={produto.descricao}
                            onChange={manipulaMudanca}
                        />
                        <Form.Control.Feedback>OK!</Form.Control.Feedback>
                        <Form.Control.Feedback type='invalid'>Informar o Descrição!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="2" controlId="validationValidade">
                        <Form.Label>Validade</Form.Label>
                        <Form.Control
                            required
                            type="date"
                            placeholder="Informe a Validade"
                            defaultValue=""
                            id="validade"
                            name="validade"
                            value={produto.validade}
                            onChange={manipulaMudanca}
                        />
                        <Form.Control.Feedback>OK!</Form.Control.Feedback>
                        <Form.Control.Feedback type='invalid'>Informar o Validade!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationBarra">
                        <Form.Label>Codigo de barras</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Codigo de barras"
                            id="cod_barra"
                            name="cod_barra"
                            value={produto.cod_barra}
                            onChange={manipulaMudanca}
                        />
                        <Form.Control.Feedback type="invalid"> Please provide a valid Barro.</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationProducao">
                        <Form.Label>Preço de Produção</Form.Label>
                        <Form.Control type="number" placeholder="Preço de produção" required id="preco_custo" name="preco_custo" value={produto.preco_custo} onChange={manipulaMudanca} />
                        <Form.Control.Feedback type="invalid"> Please provide a valid Preço de Produção.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationVenda">
                        <Form.Label>Preço de Venda</Form.Label>
                        <Form.Control type="number" placeholder="Preço de venda" required id="preco_venda" name="preco_venda" value={produto.preco_venda} onChange={manipulaMudanca} />
                        <Form.Control.Feedback type="invalid"> Please provide a valid Preço de Venda.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationEstoque">
                        <Form.Label>Estoque</Form.Label>
                        <Form.Control type="number" placeholder="Quantidade em estoque" required id="estoque" name="estoque" value={produto.estoque} onChange={manipulaMudanca} />
                        <Form.Control.Feedback type="invalid"> Please provide a valid State.</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Button type="submit">Cadastrar</Button><hr />
                <Button type="button" onClick={() => props.onTabela(true)}>Voltar</Button>
            </Form>
        );
    }
    else if (status === STATUS.ERRO) {
        return (
            <Container>
                <p><h2>Houve erro ao tentar cadastrar o produto</h2></p><hr />
                <Button type="button" onClick={() => props.onTabela(true)}>Voltar</Button>
            </Container>
        );
    }
}