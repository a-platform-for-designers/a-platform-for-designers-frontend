import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
});

export const { changeAuth } = authSlice.actions;

export default authSlice.reducer;
