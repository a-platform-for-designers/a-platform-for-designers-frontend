import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import dataReducer from "./slices/dataSlice";
import chatReducer from "./slices/chatSlice";
import popUpReducer from "./slices/popUpSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    data: dataReducer,
    chat: chatReducer,
    popUp: popUpReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
