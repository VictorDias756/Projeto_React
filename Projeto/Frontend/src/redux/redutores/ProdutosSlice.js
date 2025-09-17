import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const urlBase = 'http://localhost:4000/produtos';
export const STATUS = Object.freeze({
    'OCIOSO': 'idle',
    'CARREGADO': 'fulfilled',
    'ERRO': 'rejected'
});

export const buscarProduto = createAsyncThunk('produtos/buscarProdutos', async () => {
    const resposta = await fetch(urlBase, { method: 'GET' });
    const dados = await resposta.json();
    return dados;
});

export const adicionarProduto = createAsyncThunk('produtos/adicionarProduto', async (produto) => {
    const resposta = await fetch(urlBase, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produto)
    });
    //Obs: o resultado não deve ser processado na chamada assincrona
    const resultado = await resposta.json();
    return {
        produto: produto,
        resposta: resultado
    };
});

export const excluirProduto = createAsyncThunk('produtos/excluirProduto', async (produto) => {
    const resposta = await fetch(urlBase, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produto)
    });
    //Obs: o resultado não deve ser processado na chamada assincrona
    const resultado = await resposta.json();
    return {
        produto: produto,
        resposta: resultado
    };
});

const produtoSlice = createSlice({
    name: 'produtos',
    initialState: {
        status: STATUS.OCIOSO,
        dados: [],
        mensagem:""
    },

    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(buscarProduto.pending, (state, action) => {
            state.status = STATUS.OCIOSO;
        })
        .addCase(buscarProduto.fulfilled, (state, action) => {
            state.status = STATUS.CARREGADO;
            state.dados = action.payload;
        })
        .addCase(buscarProduto.rejected, (state, action) => {
            state.status = STATUS.ERRO;
        })
        .addCase(adicionarProduto.pending, (state, action) => {
            state.status = STATUS.OCIOSO;
        })
        .addCase(adicionarProduto.fulfilled, (state, action) => {
            if (action.payload.status === false) {
                state.status = STATUS.ERRO;
            }
            else {
                state.status = STATUS.CARREGADO;
                state.dados.push({ ...action.payload.produto, id: action.payload.resposta.id });
            }
        })
        .addCase(adicionarProduto.rejected, (state, action) => {
            state.status = STATUS.ERRO;
        })
        .addCase(excluirProduto.pending, (state, action) => {
            state.status = STATUS.OCIOSO;
        })
        .addCase(excluirProduto.fulfilled, (state,action) =>{
            if (action.payload.status === false) {
                state.status = STATUS.ERRO;
            }
            else {
                state.status = STATUS.CARREGADO;
                state.dados.pop({ ...action.payload.produto, id: action.payload.resposta.id });
            }
        })
        .addCase(excluirProduto.rejected, (state,action)=>{
            state.status=STATUS.ERRO;
        });
    }
});

export default produtoSlice.reducer;