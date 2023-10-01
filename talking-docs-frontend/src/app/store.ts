import { configureStore } from "@reduxjs/toolkit";
import { chatReducer } from "../services/chatSlice";

export const store = configureStore({
    reducer: {
        chatReducer
    }
})
export type RootState = ReturnType<typeof store.getState>;