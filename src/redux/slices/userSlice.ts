import { userService } from "@/api";
import { tokenManager } from "@/api/api";
import {
  ICreateUserRequest,
  IProfileDesigner,
  IUpdateInfoUserMe,
  IUser,
} from "@/types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { logIn, changeAuth } from "./authSlice";
import { RestApiErrors } from "@/api/api";

interface IInitialState {
  loading: "idle" | "pending" | "succeeded" | "failed";
  user: IUser | null;
  errorMessages: string[];
}

const initialState: IInitialState = {
  loading: "idle",
  user: null,
  errorMessages: [],
};

export const getInfoAboutMe = createAsyncThunk(
  "user/fetchInfoUserStatus",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      if (!tokenManager.hasToken()) {
        throw Error;
      }
      const user = await userService.getInfoUserMe();
      dispatch(changeAuth(true));
      return user;
    } catch (error) {
      dispatch(changeAuth(false));
      if (error instanceof RestApiErrors) {
        throw rejectWithValue(error.messages);
      } else {
        throw error;
      }
    }
  }
);

export const updateInfoAboutMe = createAsyncThunk(
  "user/updateInfoUserStatus",
  async (body: IUpdateInfoUserMe, { rejectWithValue }) => {
    try {
      await userService.updateInfoUserMe(body);
    } catch (error) {
      if (error instanceof RestApiErrors) {
        throw rejectWithValue(error.messages);
      } else {
        throw error;
      }
    }
  }
);

export const createUser = createAsyncThunk(
  "user/createUserStatus",
  async (data: ICreateUserRequest, { dispatch, rejectWithValue }) => {
    try {
      await userService.createUser(data);
      await dispatch(logIn({ email: data.email, password: data.password }));
      await dispatch(getInfoAboutMe());
    } catch (error) {
      if (error instanceof RestApiErrors) {
        throw rejectWithValue(error.messages);
      } else {
        throw error;
      }
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    deleteUserInfo: (state) => {
      state.user = null;
    },
    setUserInfo: (state, action: PayloadAction<IProfileDesigner>) => {
      const updatedUser = { ...action.payload };
      if (state.user) {
        state.user.profiledesigner = updatedUser;
      }
    },
    resetAuthErrors: (state) => {
      state.errorMessages.length = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(getInfoAboutMe.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.user = action.payload;
      })
      .addMatcher(
        (action) => /^user.*?\/rejected/.test(action.type),
        (state, action) => {
          state.loading = "failed";
          if (action.payload) {
            state.errorMessages = action.payload as string[];
          }
        }
      );
  },
});

export const { setUserInfo, deleteUserInfo, resetAuthErrors } =
  userSlice.actions;

export default userSlice.reducer;
