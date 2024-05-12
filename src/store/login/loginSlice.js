import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token : null,
};

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        addToken: (state,action) => {
            const token = action.payload.token;
            state.token = token;
        },
        removeToken: (state,action) => {
            state.token = null;
        },
    }
});

export const {addToken, removeToken} = loginSlice.actions;

export default loginSlice.reducer;