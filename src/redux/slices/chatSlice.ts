import { IChat, IShortMessage } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RestApiErrors } from "@/api/api";
import { chartService } from "@/api/services/chartsService";
import { SocketEvent, WebSocketClient } from "@/features/webSocketClient";

interface IInitialState {
  loading: "idle" | "pending" | "succeeded" | "failed";
  chats: IChat[];
  messages: IShortMessage[];
  count: number;
  errorMessages: string[];
}

const initialState: IInitialState = {
  loading: "idle",
  chats: [],
  messages: [],
  count: 0,
  errorMessages: [],
};
const socket = new WebSocketClient();

export const getChats = createAsyncThunk(
  "chat/fetchChats",
  async (_, { rejectWithValue }) => {
    try {
      const chats = await chartService.getChats();
      return chats;
    } catch (error) {
      if (error instanceof RestApiErrors) {
        throw rejectWithValue(error.messages);
      } else {
        throw error;
      }
    }
  },
);

export const getMessages = createAsyncThunk(
  "chat/fetchMessages",
  async (chatId: number, { dispatch }) => {
    socket.socketMessage = (event: SocketEvent) => {
      if (!event?.data) {
        return false;
      }
      const data = JSON.parse(event.data);
      const {
        id,
        file,
        text,
        pub_date,
        sender: { id: sender_id },
      } = data || {};
      dispatch(addMessage({ id, file, text, pub_date, sender_id }));
    };
    dispatch(resetMessages());
    socket.connect(chatId);
  },
);

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (message: string) => {
    socket.sendMessage(message);
  },
);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    resetMessages: (state) => {
      state.messages.length = 0;
    },
    resetChats: (state) => {
      state.chats.length = 0;
    },
    resetAuthErrors: (state) => {
      state.errorMessages.length = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChats.fulfilled, (state, action) => {
        state.loading = "succeeded";
        const { results, count } = action.payload;
        state.chats = results;
        state.count = count;
      })
      .addMatcher(
        (action) => /^chat.*?\/pending/.test(action.type),
        (state) => {
          state.loading = "pending";
        },
      )
      .addMatcher(
        (action) => /^chat.*?\/rejected/.test(action.type),
        (state, action) => {
          state.loading = "failed";
          state.errorMessages = action.payload as string[];
        },
      );
  },
});

export const { resetAuthErrors, addMessage, resetMessages, resetChats } = chatSlice.actions;

export default chatSlice.reducer;
