import { useEffect } from "react";
import { Container, Table, Button, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { buscarProduto, excluirProduto, STATUS } from "../redux/redutores/ProdutosSlice";

export default function ListaProdutos(props) {

    const dispatch = useDispatch();
    const { status, dados } = useSelector(state => state.produtos);

    //willMount
    useEffect(() => {
        dispatch(buscarProduto());
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
                    Carregando Produtos..
                </Button>
                <hr />
            </Container>
        );
    }
    else if (status === STATUS.CARREGADO) {
        return (
            <Container>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Codigo</th>
                            <th>Descrição</th>
                            <th>Data Validade</th>
                            <th>Preco Custo</th>
                            <th>Preco Venda</th>
                            <th>Estoque</th>
                            <th>Codigo de Barra</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dados.map(produtos =>
                                <tr>
                                    <td>{produtos.codigo}</td>
                                    <td>{produtos.descricao}</td>
                                    <td>{new Date(produtos.validade).toLocaleDateString('pt-BR')}</td>
                                    <td>{produtos.preco_custo}</td>
                                    <td>{produtos.preco_venda}</td>
                                    <td>{produtos.estoque}</td>
                                    <td>{produtos.cod_barra}</td>
                                    <td>
                                        <Button onClick={() => { dispatch(excluirProduto(produtos)); }}>
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
                <Button onClick={() => props.onTabela(false)}>Novo Produto</Button>
            </Container>
        );
    }
    else if (status === STATUS.ERRO) {
        return (
            <Container>
                <p><h2>Houve erro ao tentar carregar a tabela</h2></p><hr />
                <Button onClick={() => props.onTabela(false)}>Novo Produto</Button>
            </Container>
        );
    }
}