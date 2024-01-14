import { IChat, IMessage, ISocketMessage } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RestApiErrors, tokenManager } from "@/api/api";
import { chartsService } from "@/api";
import { WebSocketClient } from "@/features/webSocketClient";
import { WS_URL } from "@/constants/constants";
import { fetchMessages } from "@/features/fetchMessages";
import { RootState } from "../store";

interface IInitialState {
  loading: "idle" | "pending" | "succeeded" | "failed";
  chats: IChat[];
  activeChat: IChat | null;
  messages: Record<string, IMessage>;
  messagesPage: number;
  lastMessagesPage: number | null;
  count: number;
  popUpOn: boolean;
  receiverId: number | null;
  errorMessages: string[];
}

const initialState: IInitialState = {
  loading: "idle",
  chats: [],
  activeChat: null,
  messages: {},
  messagesPage: 1,
  lastMessagesPage: null,
  count: 0,
  popUpOn: false,
  receiverId: null,
  errorMessages: [],
};
const socket = new WebSocketClient();

export const getChats = createAsyncThunk(
  "chat/fetchChats",
  async (_, { rejectWithValue }) => {
    try {
      const chats = await chartsService.getChats();
      return chats;
    } catch (error) {
      if (error instanceof RestApiErrors) {
        throw rejectWithValue(error.messages);
      } else {
        throw error;
      }
    }
  }
);

export const getMessages = createAsyncThunk(
  "chat/fetchMessages",
  async (_, { dispatch, getState }) => {
    const {
      chat: { activeChat, messagesPage },
    } = getState() as RootState;

    if (activeChat) {
      socket.init(WS_URL(activeChat.id, tokenManager.getToken()));

      const messagesGenerator = fetchMessages({ socket, page: messagesPage });
      for await (const message of messagesGenerator) {
        if (message?.text === "Нет более ранних сообщений") {
          console.log("Нет более ранних сообщений");
          dispatch(setLatPage());
        } else {
          dispatch(addMessage(message));
        }
      }
    }
  }
);

export const loadMoreMessages = createAsyncThunk(
  "chat/loadMoreMessages",
  async (_, { dispatch }) => {
    //dispatch(nextPage());
    dispatch(getMessages);
  }
);

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (message: ISocketMessage) => {
    socket.sendMessage(message);
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    nextPage: (state) => {
      state.messagesPage = state.messagesPage + 1;
    },
    setLatPage: (state) => {
      state.lastMessagesPage = state.messagesPage;
    },
    addMessage: (state, action) => {
      const message = action.payload as IMessage;
      state.messages[message!.id] = message;
    },
    resetMessages: (state) => {
      state.messages = {};
    },
    setActiveChat: (state, action) => {
      state.activeChat = action.payload;
    },
    resetChats: (state) => {
      state.chats.length = 0;
    },
    resetAuthErrors: (state) => {
      state.errorMessages.length = 0;
    },
    showMessagePopUp: (state, action) => {
      state.popUpOn = true;
      state.receiverId = action.payload;
    },
    hideMessagePopUp: (state) => {
      state.popUpOn = false;
      state.receiverId = null;
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
        }
      )
      .addMatcher(
        (action) => /^chat.*?\/rejected/.test(action.type),
        (state, action) => {
          state.loading = "failed";
          state.errorMessages = action.payload as string[];
        }
      );
  },
});

export const {
  resetAuthErrors,
  addMessage,
  resetMessages,
  resetChats,
  setActiveChat,
  nextPage,
  setLatPage,
  showMessagePopUp,
  hideMessagePopUp,
} = chatSlice.actions;

export default chatSlice.reducer;
