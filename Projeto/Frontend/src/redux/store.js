import { configureStore } from "@reduxjs/toolkit";
import CarrinhoReducer from "./redutores/CarrinhoSlice";
import ClientesReducer from "./redutores/ClientesSlice";
import FornecedorReducer from "./redutores/FornecedorSlice";
import ProdutosReducer from "./redutores/ProdutosSlice";

//A loja(store) armazena uma relação de redutores
const store = configureStore({
    reducer:{
        clientes: ClientesReducer,
        fornecedores: FornecedorReducer,
        produtos: ProdutosReducer,
        carrinho: CarrinhoReducer
    }
});

export default store;