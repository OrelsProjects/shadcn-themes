import { createSlice } from "@reduxjs/toolkit";

export interface TempState {}

export const initialState: TempState = {};

const tempSlice = createSlice({
  name: "temp",
  initialState,
  reducers: {},
});

export const {} = tempSlice.actions;

// export const selectTemp = (state: RootState): TempState => state.temp;

export default tempSlice.reducer;
