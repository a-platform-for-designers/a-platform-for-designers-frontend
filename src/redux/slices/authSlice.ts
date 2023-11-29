import { authService } from "@/api";
import { IAuthUserRequest } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";

interface IInitialState {
  isAuth: boolean;
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: IInitialState = {
  isAuth: false,
  loading: "idle",
};

export const logIn = createAsyncThunk(
  "auth/loginStatus",
  async (data: IAuthUserRequest) => {
    const response = await authService.login(data);
    return response;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logIn.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(logIn.fulfilled, (state, action) => {
      localStorage.setItem("token", action.payload.auth_token);
      state.isAuth = true;
      state.loading = "succeeded";
      enqueueSnackbar({
        variant: "success",
        message: "Вы успешно вошли",
      });
    });
    builder.addCase(logIn.rejected, (state) => {
      state.isAuth = false;
      state.loading = "failed";
      enqueueSnackbar({
        variant: "error",
        message: "Что-то пошло не так",
      });
    });
  },
});

export const { changeAuth } = authSlice.actions;

export default authSlice.reducer;
