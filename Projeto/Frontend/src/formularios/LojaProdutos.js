import { Container, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adicionar } from "../redux/redutores/CarrinhoSlice";

export default function FormLogin(props) {

    const dispatch = useDispatch();

    const length = useSelector(state => state.carrinho.length);

    const [produtos, setProdutos] = useState([]);

    const manipularEnvioDados = (event) => {
        dispatch(adicionar(produtos[event.target.id]));
        event.preventDefault();
        event.stopPropagation();
    };

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(resposta => {
                if (resposta.ok)
                    return resposta.json()

                throw resposta;
            })
            .then(dados => setProdutos(dados))
            .catch(error => console.error("Erro Fetch"))
    }, [])

    return (
        <Container>
            <Button onClick={() => props.onTabela(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart2" viewBox="0 0 16 16">
                    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                </svg>
                {length}
            </Button>
            {produtos.map(produto =>
                <table>
                    <tbody>
                        <tr>
                            <td className="text-center" >
                                <img style={{ width: '80px', heigth: '80px' }} src={produto.image} />
                                <span>{produto.title}</span><br />
                                <span>R${produto.price}</span><br />
                                <Button id={produto.id - 1} onClick={manipularEnvioDados} variant="primary" type="button">Comprar</Button>
                            </td>
                        </tr>
                    </tbody>
                </table>)}
        </Container>
    );
}