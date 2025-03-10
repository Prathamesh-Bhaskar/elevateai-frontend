// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import inputReducer from "./slices/inputSlice"; // adjust the import path as needed

export const store = configureStore({
  reducer: {
    input: inputReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
