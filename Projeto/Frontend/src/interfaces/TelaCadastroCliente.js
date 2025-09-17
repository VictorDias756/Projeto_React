import { useState } from "react";
import FormCadastroCliente from "../formularios/FormularioCliente";
import ListaClientes from "../tabelas/listaClientes";
import Pagina from "../templates/Pagina";

export default function TelaCadastroCliente(props){
    
    const [exibirtabela,setExibirTabela]= useState(true);

    if(exibirtabela){
        return(
            <Pagina>
                <ListaClientes onTabela={setExibirTabela}/>
            </Pagina>
        )
    }
    else{
        return(
            <Pagina>
                <FormCadastroCliente onTabela={setExibirTabela}/>
            </Pagina>
        )
    }
}