import { authService } from "@/api";
import { RestApiErrors } from "@/api/api";
import { IAuthUserRequest } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  isAuth: boolean;
  loading: "idle" | "pending" | "succeeded" | "failed";
  errorMessages: string[];
}

const initialState: IInitialState = {
  isAuth: false,
  loading: "idle",
  errorMessages: [],
};

export const logIn = createAsyncThunk(
  "auth/loginStatus",
  async (data: IAuthUserRequest, { rejectWithValue }) => {
    try {
      const response = await authService.login(data);
      return response;
    } catch (error) {
      if (error instanceof RestApiErrors) {
        throw rejectWithValue(error.messages);
      } else {
        throw error;
      }
    }
  },
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    resetAuthErrors: (state) => {
      state.errorMessages.length = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logIn.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(logIn.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload.auth_token);
        state.isAuth = true;
        state.loading = "succeeded";
      });
    builder.addCase(logIn.rejected, (state, action) => {
      state.isAuth = false;
      state.loading = "failed";
      state.errorMessages = action.payload as string[];
    });
  },
});

export const { changeAuth, resetAuthErrors } = authSlice.actions;

export default authSlice.reducer;
