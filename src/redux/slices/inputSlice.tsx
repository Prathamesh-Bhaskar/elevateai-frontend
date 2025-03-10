// src/redux/slices/inputSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InputState {
  user_input: string;
  problem: string;
  target_customers: string;
  solution: string;
  key_resources: string;
  revenue_streams: string;
}

const initialState: InputState = {
  user_input: "",
  problem: "",
  target_customers: "",
  solution: "",
  key_resources: "",
  revenue_streams: "",
};

export const inputSlice = createSlice({
  name: "input",
  initialState,
  reducers: {
    setInputText: (state, action: PayloadAction<string>) => {
      state.user_input = action.payload;
    },
    setProblem: (state, action: PayloadAction<string>) => {
      state.problem = action.payload;
    },
    setTargetCustomers: (state, action: PayloadAction<string>) => {
      state.target_customers = action.payload;
    },
    setSolution: (state, action: PayloadAction<string>) => {
      state.solution = action.payload;
    },
    setKeyResources: (state, action: PayloadAction<string>) => {
      state.key_resources = action.payload;
    },
    setRevenueStreams: (state, action: PayloadAction<string>) => {
      state.revenue_streams = action.payload;
    },
    setAllFields: (state, action: PayloadAction<InputState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  setInputText,
  setProblem,
  setTargetCustomers,
  setSolution,
  setKeyResources,
  setRevenueStreams,
  setAllFields,
} = inputSlice.actions;

export default inputSlice.reducer;
