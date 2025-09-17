import { useState } from "react";
import FormCadastroProduto from "../formularios/FormularioProduto";
import ListaProdutos from "../tabelas/listaProdutos";
import Pagina from "../templates/Pagina";

export default function TelaCadastroProduto(props){

    const [exibirtabela, setExibirTabela] = useState(true);

    if(exibirtabela){
        return(
            <Pagina>
                <ListaProdutos onTabela={setExibirTabela}/>
            </Pagina>
        );
    }
    else{
        return(
        <Pagina>
            <FormCadastroProduto onTabela={setExibirTabela}/>
        </Pagina>
    );
    }
    
}