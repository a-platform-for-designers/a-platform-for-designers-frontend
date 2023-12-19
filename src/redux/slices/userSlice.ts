import { userService } from "@/api";
import {
  ICreateUserRequest,
  IProfileDesigner,
  IUpdateInfoUserMe,
  IUser,
} from "@/types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { logIn } from "./authSlice";
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
  async () => {
    const user = await userService.getInfoUserMe();
    return user;
  },
);

export const updateInfoAboutMe = createAsyncThunk(
  "user/updateInfoUserStatus",
  async (body: IUpdateInfoUserMe) => {
    const user = await userService.updateInfoUserMe(body);
    return user;
  },
);

export const createUser = createAsyncThunk(
  "user/createUserStatus",
  async (data: ICreateUserRequest, { dispatch, rejectWithValue }) => {
    try {
      await userService.createUser(data);
      await dispatch(logIn({ email: data.email, password: data.password }));
      const user = await userService.getInfoUserMe();
      return user;
    } catch (error) {
      console.log("error", error instanceof RestApiErrors);
      if (error instanceof RestApiErrors) {
        throw rejectWithValue(error.messages);
      } else {
        throw error;
      }
    }
  },
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
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.user = action.payload;
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.loading = "failed";
      state.errorMessages = action.payload as string[];
    });
    builder.addCase(getInfoAboutMe.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.user = action.payload;
    });
    builder.addCase(getInfoAboutMe.rejected, (state) => {
      state.loading = "failed";
    });
  },
});

export const { setUserInfo, deleteUserInfo, resetAuthErrors } =
  userSlice.actions;

export default userSlice.reducer;
