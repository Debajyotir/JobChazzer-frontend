import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginReducer from "./login/loginSlice";
import searchReducer from "./search/searchSlice";

const rootReducer = combineReducers({
    login:loginReducer,
    search:searchReducer,
})

export const store = configureStore({
    reducer: rootReducer,
});