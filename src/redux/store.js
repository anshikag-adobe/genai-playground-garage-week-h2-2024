import {configureStore} from "@reduxjs/toolkit";
import playgroundReducer from "./playgroundSlice.js";

const store = configureStore({
    reducer: {
        playground: playgroundReducer
    }
});


export default store;