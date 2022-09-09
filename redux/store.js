import { configureStore } from "@reduxjs/toolkit";
import headerSlice from "./features/headerSlice";

export const store = configureStore({
    reducer: {
        header: headerSlice
    },
});