import { createSlice } from "@reduxjs/toolkit";
import { TraSuaType } from "../../types/TraSuaType";
import { OrderType } from "../../types/OrderType";

type trasua = {
    trasua : TraSuaType[],
    order: OrderType[],
}

const initialState: trasua = {
    trasua: [],
    order: []
}


const trasuaSlice = createSlice({
    name: "trasua",
    initialState: initialState,
    reducers: {
        trasuaState: (state, action: { payload: TraSuaType[]}) => {
            state.trasua = action.payload
        },
        orderState: (state, action: { payload: OrderType[]}) => {
            state.order = action.payload
        }
    }
})

export const {
    trasuaState,
    orderState
} = trasuaSlice.actions

export default trasuaSlice.reducer