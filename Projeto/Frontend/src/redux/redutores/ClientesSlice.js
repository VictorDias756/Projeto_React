import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const urlBase = 'http://localhost:4000/clientes';
export const STATUS = Object.freeze({
    'OCIOSO': 'idle',
    'CARREGADO': 'fulfilled',
    'ERRO': 'rejected'
});

export const buscarCliente = createAsyncThunk('clientes/buscarClientes', async () => {
    const resposta = await fetch(urlBase, { method: 'GET' });
    const dados = await resposta.json();
    return dados;
});

export const adicionarCliente = createAsyncThunk('clientes/adicionarCliente', async (cliente) => {
    const resposta = await fetch(urlBase, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente)
    });
    //Obs: o resultado não deve ser processado na chamada assincrona
    const resultado = await resposta.json();
    return {
        cliente: cliente,
        resposta: resultado
    };
});

export const excluirCliente = createAsyncThunk('clientes/excluirCliente', async (cliente) => {
    const resposta = await fetch(urlBase, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente)
    });
    //Obs: o resultado não deve ser processado na chamada assincrona
    const resultado = await resposta.json();
    return {
        cliente: cliente,
        resposta: resultado
    };
});

const clientesSlice = createSlice({
    name: 'clientes', //reducer cliente
    initialState: {   //estado inicial da fatia cliente
        status: STATUS.OCIOSO,
        dados: [],
        mensagem:""
    },

    //lista de ações que podem alterar o estado da lista de clientes
    reducers: {
        /*   
           //metodo adicionar manipula o estado da ação dado uma action
           adicionar: (state, action) => {
               //graças a biblioteca immer
               state.push(action.payload);
           },
           // ao despachar a action remover, passe o CPF como parâmetro
           remover: (state, action) => {
               return state.filter((cliente) => cliente.cpf !== action.payload)
           }
        */
    },
    extraReducers: (builder) => {
        builder.addCase(buscarCliente.pending, (state, action) => {
            state.status = STATUS.OCIOSO;
        })
        .addCase(buscarCliente.fulfilled, (state, action) => {
            state.status = STATUS.CARREGADO;
            state.dados = action.payload;
        })
        .addCase(buscarCliente.rejected, (state, action) => {
            state.status = STATUS.ERRO;
        })
        .addCase(adicionarCliente.pending, (state, action) => {
            state.status = STATUS.OCIOSO;
        })
        .addCase(adicionarCliente.fulfilled, (state, action) => {
            //lembrando que o status do payload é aquele de origem do backend
            //{
            //    status: true,
            //    id: ?
            //    mensagem: "mensagem vinda do backend"
            //}

            if (action.payload.status === false) {
                state.status = STATUS.ERRO;
            }
            else {
                state.status = STATUS.CARREGADO;
                state.dados.push({ ...action.payload.cliente, id: action.payload.resposta.id });
            }
        })
        .addCase(adicionarCliente.rejected, (state, action) => {
            state.status = STATUS.ERRO;
        })
        .addCase(excluirCliente.pending, (state, action) => {
            state.status = STATUS.OCIOSO;
        })
        .addCase(excluirCliente.fulfilled, (state,action) =>{
            if (action.payload.status === false) {
                state.status = STATUS.ERRO;
            }
            else {
                state.status = STATUS.CARREGADO;
                state.dados.pop({ ...action.payload.cliente, id: action.payload.resposta.id });
            }
        })
        .addCase(excluirCliente.rejected, (state,action)=>{
            state.status=STATUS.ERRO;
        });
    }
});

//export const { adicionar, remover } = clientesSlice.actions;
export default clientesSlice.reducer;