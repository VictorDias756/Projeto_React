import { useEffect } from "react";
import { Container, Table, Button, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { buscarFornecedor, excluirFornecedor, STATUS } from "../redux/redutores/FornecedorSlice";

export default function ListaFornecedor(props) {

    const dispatch = useDispatch();
    const { status, dados } = useSelector(state => state.fornecedores);

    //willMount
    useEffect(() => {
        dispatch(buscarFornecedor());
    }, []);

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
                    Carregando Clientes..
                </Button>
                <hr />
            </Container>
        );
    }
    else if (status == STATUS.CARREGADO) {
        return (
            <Container>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Codigo</th>
                            <th>Nome</th>
                            <th>Cidade</th>
                            <th>Endereco</th>
                            <th>CEP</th>
                            <th>Ativo</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dados.map(fornecedor =>
                                <tr>
                                    <td>{fornecedor.codigo}</td>
                                    <td>{fornecedor.nome}</td>
                                    <td>{fornecedor.cidade + ' / ' + fornecedor.estado}</td>
                                    <td>{fornecedor.endereco + ' / ' + fornecedor.bairro}</td>
                                    <td>{fornecedor.cep}</td>
                                    <td className="text-center align-middle">{
                                        fornecedor.ativo ?
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                            </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                            </svg>}
                                    </td>
                                    <td>
                                        <Button onClick={() => { dispatch(excluirFornecedor(fornecedor)); }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                            </svg>
                                        </Button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
                <Button onClick={() => props.onTabela(false)}>Novo fornecedor</Button>
            </Container>
        );
    }
    else if (status == STATUS.ERRO) {
        return (
            <Container>
                <p><h2>Houve erro ao tentar carregar a tabela</h2></p><hr />
                <Button onClick={() => props.onTabela(false)}>Novo fornecedor</Button>
            </Container>
        );
    }
}