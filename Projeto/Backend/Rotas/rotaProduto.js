import {Router} from 'express';
import ProdutoCTRL from '../Controle/ProdutoCTRL.js';

//cria uma micro aplicação HTTP
const rotaProduto = new Router();
const controleProduto = new ProdutoCTRL();

rotaProduto.get("/", controleProduto.consultar)
.get("/:id", controleProduto.consultarID)
.post("/", controleProduto.gravar)
.put("/", controleProduto.atualizar)
.delete("/", controleProduto.excluir);


export default rotaProduto;