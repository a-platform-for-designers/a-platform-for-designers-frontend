import { authService } from "@/api";
import { RestApiErrors, tokenManager } from "@/api/api";
import { IAuthUserRequest, IResetPasswordConfirmData } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteUserInfo } from "./userSlice";
import { resetChats } from "./chatSlice";

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
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await authService.resetPassword(email);
      return response;
    } catch (error) {
      if (error instanceof RestApiErrors) {
        throw rejectWithValue(error.messages);
      } else {
        throw error;
      }
    }
  }
);

export const confirmPassword = createAsyncThunk(
  "auth/confirmPassword",
  async (data: IResetPasswordConfirmData, { rejectWithValue }) => {
    try {
      const response = await authService.resetPasswordConfirm(data);
      return response;
    } catch (error) {
      if (error instanceof RestApiErrors) {
        throw rejectWithValue(error.messages);
      } else {
        throw error;
      }
    }
  }
);

export const logOut = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    await authService.logout();
    tokenManager.clearToken();
    dispatch(deleteUserInfo());
    // dispatch(resetMessages());
    dispatch(resetChats());
  }
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
      .addCase(logIn.fulfilled, (state, action) => {
        tokenManager.setToken(action.payload.auth_token);
        state.isAuth = true;
        state.loading = "succeeded";
      })
      .addCase(logOut.fulfilled, (state) => {
        state.isAuth = false;
      })
      .addMatcher(
        (action) => /^auth.*?\/fulfilled/.test(action.type),
        (state) => {
          state.loading = "succeeded";
        }
      )
      .addMatcher(
        (action) => /^auth.*?\/rejected/.test(action.type),
        (state, action) => {
          state.loading = "failed";
          state.errorMessages = action.payload as string[];
        }
      )
      .addMatcher(
        (action) => /^auth.*?\/pending/.test(action.type),
        (state) => {
          state.loading = "pending";
        }
      );
  },
});

export const { changeAuth, resetAuthErrors } = authSlice.actions;

export default authSlice.reducer;
