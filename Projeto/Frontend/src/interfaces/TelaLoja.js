import { useState } from "react";
import LojaProdutos from "../formularios/LojaProdutos";
import ListaCarrinho from "../tabelas/listaCarrinho";
import Pagina from "../templates/Pagina";

export default function TelaLoja(props) {

    const [exibirtabela, setExibirTabela] = useState(false);

    if (exibirtabela) {
        return (
            <Pagina>
                <ListaCarrinho onTabela={setExibirTabela} />
            </Pagina>
        );
    }
    else {
        return (
            <Pagina>
                <LojaProdutos onTabela={setExibirTabela} />
            </Pagina>
        );
    }


}