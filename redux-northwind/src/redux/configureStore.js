import {configureStore} from "@reduxjs/toolkit";
import categoriesReducer from "./slice/categoriesSlice";
import productsReducer from "./slice/productsSlice";
import cartReducer from "./slice/cartSlice";

//store ile reducerleri(slice) bağluyorurz counter (reducer adı) : reducer dosyası (import slice)
export const store = configureStore({
    reducer: {
        categories : categoriesReducer,
        products : productsReducer,
        cart : cartReducer,
    },
  });

