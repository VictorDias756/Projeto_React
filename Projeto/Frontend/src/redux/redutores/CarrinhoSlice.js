import { createSlice } from "@reduxjs/toolkit";

const carrinhoSlice = createSlice({
    name: 'carrinho',
    initialState: [],

    reducers: {

        adicionar: (state, action) => {
            state.push(action.payload);
        },

        remover: (state, action) => {
            return state.filter((carrinho) => carrinho.id !== action.payload)
        }
    }
});

export const { adicionar, remover } = carrinhoSlice.actions;
export default carrinhoSlice.reducer;