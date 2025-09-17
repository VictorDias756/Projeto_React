import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const urlBase = 'http://localhost:4000/fornecedores';
export const STATUS = Object.freeze({
    'OCIOSO': 'idle',
    'CARREGADO': 'fulfilled',
    'ERRO': 'rejected'
});

export const buscarFornecedor = createAsyncThunk('fornecedores/buscarFornecedor', async () => {
    const resposta = await fetch(urlBase, { method: 'GET' });
    const dados = await resposta.json();
    return dados;
});

export const adicionarFornecedor = createAsyncThunk('fornecedores/adicionarFornecedor', async (fornecedor) => {
    const resposta = await fetch(urlBase, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fornecedor)
    });
    const resultado = await resposta.json();
    return {
        fornecedor: fornecedor,
        resposta: resultado
    };
})

export const excluirFornecedor = createAsyncThunk('fornecedores/excluirFornecedor', async (fornecedor) => {
    const resposta = await fetch(urlBase, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fornecedor)
    });
    const resultado = await resposta.json();
    return {
        fornecedor: fornecedor,
        resposta: resultado
    };
})

const fornecedorSlice = createSlice({
    name: 'fornecedores',
    initialState: {
        status: STATUS.OCIOSO,
        dados: [],
        mensagem:""
    },

    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(buscarFornecedor.pending, (state, action) => {
            state.status = STATUS.OCIOSO;
        })
        .addCase(buscarFornecedor.fulfilled, (state, action) => {
            state.status = STATUS.CARREGADO;
            state.dados = action.payload;
        })
        .addCase(buscarFornecedor.rejected, (state, action) => {
            state.status = STATUS.ERRO;
        })
        .addCase(adicionarFornecedor.pending, (state, action) => {
            state.status = STATUS.OCIOSO;
        })
        .addCase(adicionarFornecedor.fulfilled, (state, action) => {
            if (action.payload.status === false) {
                state.status = STATUS.ERRO;
            }
            else {
                state.status = STATUS.CARREGADO;
                state.dados.push({ ...action.payload.fornecedor, id: action.payload.resposta.id });
            }
        })
        .addCase(adicionarFornecedor.rejected, (state, action) => {
            state.status = STATUS.ERRO;
        })
        .addCase(excluirFornecedor.pending, (state, action) => {
            state.status = STATUS.OCIOSO;
        })
        .addCase(excluirFornecedor.fulfilled, (state,action) =>{
            if (action.payload.status === false) {
                state.status = STATUS.ERRO;
            }
            else {
                state.status = STATUS.CARREGADO;
                state.dados.pop({ ...action.payload.fornecedor, id: action.payload.resposta.id });
            }
        })
        .addCase(excluirFornecedor.rejected, (state,action)=>{
            state.status=STATUS.ERRO;
        });
    }
});

export default fornecedorSlice.reducer;