import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  [key: string]: boolean;
}

const initialState: IInitialState = {};

export const popUpSlice = createSlice({
  name: "popUp",
  initialState,
  reducers: {
    togglePopUp: (state, action: PayloadAction<{ [key: string]: boolean }>) => {
      for (const key in action.payload) {
        state[key] = action.payload[key];
      }
    },
  },
});

export const { togglePopUp } = popUpSlice.actions;

export default popUpSlice.reducer;
