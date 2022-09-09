import { configureStore } from "@reduxjs/toolkit";
import headerSlice from "./features/headerSlice";
import countriesSlice from "./features/countriesSlice";
import settingsSlice from "./features/settingsSlice";

export const store = configureStore({
    reducer: {
        settings: settingsSlice,
        header: headerSlice,
        countries: countriesSlice
    },
});