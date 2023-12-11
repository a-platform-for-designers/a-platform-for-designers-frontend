import { authService } from "@/api";
import { IAuthUserRequest } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { enqueueSnackbar } from "notistack";

interface IInitialState {
  isAuth: boolean;
  loading: "idle" | "pending" | "succeeded" | "failed";
  errorMessage: object;
}

const initialState: IInitialState = {
  isAuth: false,
  loading: "idle",
  errorMessage: {},
};

export const logIn = createAsyncThunk(
  "auth/loginStatus",
  async (data: IAuthUserRequest, { dispatch }) => {
    try {
      const response = await authService.login(data);
      return response;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        dispatch(setErrorMessage(error.response?.data));
        console.error(error.response?.data.non_field_errors);
      }
      throw error;
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<object>) => {
      state.errorMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logIn.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(logIn.fulfilled, (state, action) => {
      localStorage.setItem("token", action.payload.auth_token);
      state.errorMessage = {};
      state.isAuth = true;
      state.loading = "succeeded";
      enqueueSnackbar({
        variant: "success",
        message: "Вы успешно вошли",
      });
    });
    builder.addCase(logIn.rejected, (state, action) => {
      console.log(action);

      // state.errorMessage = 'Введены некорректные данные';
      state.isAuth = false;
      state.loading = "failed";
      enqueueSnackbar({
        variant: "error",
        message: "Введены некорректные данные",
      });
    });
  },
});

export const { changeAuth, setErrorMessage } = authSlice.actions;

export default authSlice.reducer;
