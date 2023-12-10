import { userService } from "@/api";
import { ICreateUserRequest, IUpdateInfoUserMe, IUser } from "@/types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { logIn } from "./authSlice";
import { enqueueSnackbar } from "notistack";

interface IInitialState {
  loading: "idle" | "pending" | "succeeded" | "failed";
  user: IUser | null;
}

const initialState: IInitialState = {
  loading: "idle",
  user: null,
};

export const getInfoAboutMe = createAsyncThunk(
  "user/fetchInfoUserStatus",
  async () => {
    const user = await userService.getInfoUserMe();
    return user;
  }
);

export const updateInfoAboutMe = createAsyncThunk(
  "user/updateInfoUserStatus",
  async (body: IUpdateInfoUserMe) => {
    const user = await userService.updateInfoUserMe(body);
    return user;
  }
);

export const createUser = createAsyncThunk(
  "user/createUserStatus",
  async (data: ICreateUserRequest, { dispatch }) => {
    await userService.createUser(data);

    await dispatch(
      logIn({
        email: data.email,
        password: data.password,
      })
    );

    const user = await userService.getInfoUserMe();
    return user;
  }
);

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /*     changeAuth: (state, action: PayloadAction<boolean>) => {
      state.user = action.payload;
    }, */
    setUserInfo: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.user = action.payload;
      enqueueSnackbar({
        variant: "success",
        message: `Добро пожаловать, ${action.payload.first_name}`,
      });
    });
    builder.addCase(createUser.rejected, (state) => {
      state.loading = "failed";
      enqueueSnackbar({
        variant: "error",
        message: `Что-то пошло не так`,
      });
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

export const { setUserInfo } = userSlice.actions;

export default userSlice.reducer;
