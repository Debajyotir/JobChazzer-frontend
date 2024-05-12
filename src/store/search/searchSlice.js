import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchInitialValues : null,
};

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        addSearchValues: (state,action) => {
            const values = action.payload;
            state.searchInitialValues = values;
        },
    }
});

export const {addSearchValues} = searchSlice.actions;

export default searchSlice.reducer;