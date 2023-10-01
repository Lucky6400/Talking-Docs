import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    sourceId: "",
    userId: ""
}

export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setCurrent(state, action) {
            state.name = action.payload.name;
            state.sourceId = action.payload.sourceId;
            state.userId = action.payload.userId;
        }
    }
})

export const chatActions = chatSlice.actions;
export const chatReducer = chatSlice.reducer;