import express from "express";
import rotaCliente from "./Rotas/rotaCliente.js";
import rotaFornecedor from "./Rotas/rotaFornecedor.js";
import rotaProduto from "./Rotas/rotaProduto.js";
import cors from "cors";

const host = 'localhost';
const porta = 4000;

const servidorHTTP = express();

servidorHTTP.use(cors({ //para expecificar aqueles que podem ter acesso a aplicação
    origen:'*'
    // origen:["www.unoeste.br"] 
}));

servidorHTTP.use(express.json());
servidorHTTP.use("/clientes", rotaCliente);
servidorHTTP.use("/fornecedores",rotaFornecedor);
servidorHTTP.use("/produtos",rotaProduto);

servidorHTTP.listen(porta, host, () => {
    console.log("Servidor escutando em http://" + host + ":" + porta);
});