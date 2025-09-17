import {Router} from 'express';
import FornecedorCTRL from '../Controle/FornecedorCTRL.js';

//cria uma micro aplicação HTTP
const rotaFornecedor = new Router();
const controleFornecedor = new FornecedorCTRL();

rotaFornecedor.get("/", controleFornecedor.consultar)
.get("/:id", controleFornecedor.consultarID)
.post("/", controleFornecedor.gravar)
.put("/", controleFornecedor.atualizar)
.delete("/", controleFornecedor.excluir);


export default rotaFornecedor;