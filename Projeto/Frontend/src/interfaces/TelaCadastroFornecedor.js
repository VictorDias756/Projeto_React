import { useState } from "react";
import FormCadastroFornecedor from "../formularios/FormularioFornecedor";
import ListaFornecedor from "../tabelas/listaFornecedor";
import Pagina from "../templates/Pagina";

export default function TelaCadastroFornecedor(props) {
    
    const [exibirtabela, setExibirTabela] = useState(true);

    if (exibirtabela) {
        return (
            <Pagina>
                <ListaFornecedor onTabela={setExibirTabela}/>
            </Pagina>
        );
    }
    else {
        return (
            <Pagina>
                <FormCadastroFornecedor onTabela={setExibirTabela} />
            </Pagina>
        );
    }
}