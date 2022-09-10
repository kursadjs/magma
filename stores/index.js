import { configureStore } from "@reduxjs/toolkit";
import header from "./header";
import countries from "./countries";
import settings from "./settings";

export const store = configureStore({
    reducer: {
        settings,
        header,
        countries
    },
});