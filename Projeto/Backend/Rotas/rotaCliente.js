import {Router} from 'express';
import ClienteCTRL from '../Controle/ClienteCTRL.js';

//cria uma micro aplicação HTTP
const rotaCliente = new Router();
const controleCliente = new ClienteCTRL();

rotaCliente.get("/", controleCliente.consultar)
.get("/:id", controleCliente.consultarID)
.post("/", controleCliente.gravar)
.put("/", controleCliente.atualizar)
.delete("/", controleCliente.excluir);


export default rotaCliente;