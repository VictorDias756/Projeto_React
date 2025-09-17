import { useState, useRef } from "react";
import { Container, Button, Form, Col, Row, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function FormVenda(props) {

    const [mostratTelaBuscaCliente, setMostratTelaBuscaCliente] = useState(true);

    const { status, dados } = useSelector(state => state.clientes);

    const [clienteSelecionado, setClienteSelecinado] = useState({id:0, nome:""});

    const componenteSelecao = useRef()

    function selecionarCliente(id) {
        return dados.filter((cliente) => cliente.id === id);
    }

    return (
        <Container>
            <Form>
                <Form.Group className="mb-3">
                    <Row>
                        <Col sm={1}>
                            <Form.Label>Cliente</Form.Label>
                        </Col>
                        <Col sm={5}>
                            <Form.Control placeholder="Selecione o cliente" id="cliente" name="cliente" value={clienteSelecionado.nome} disabled />
                        </Col>
                        <Col sm={2}>
                            <Button onClick={() => { setMostratTelaBuscaCliente(true) }}>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-search"
                                    viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </Button>
                        </Col>
                    </Row>
                </Form.Group>
            </Form>

            <Modal show={mostratTelaBuscaCliente} onHide={() => { setMostratTelaBuscaCliente(false) }}>
                <Modal.Header closeButton>
                    <Modal.Title>Selecione o Cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Select aria-label="Default select example" ref={componenteSelecao}>
                        {
                            dados.map((cliente) => {
                                return <option key={cliente.id} value={cliente.id}>
                                    {cliente.nome + " " + cliente.sobrenome}
                                </option>
                            })
                        }
                    </Form.Select>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={()=>{
                        //const idSelecionado = document.getElementById("listaCliente").value;
                        const cliente =  selecionarCliente(componenteSelecao.current.value)
                        setClienteSelecinado(cliente);
                        setMostratTelaBuscaCliente(false);
                    }}>
                        Selecionar Cliente
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}