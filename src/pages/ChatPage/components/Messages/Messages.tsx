/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box } from "@mui/material";
import { IMessage } from "@/types";
import Message from "../Message/Message";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { useEffect, useRef } from "react";
import {
  getMessages,
  resetMessages,
  loadMoreMessages,
} from "@/redux/slices/chatSlice";

const checkIsFirstMessage = (i: number, array: IMessage[]) => {
  if (i) {
    const currentMessageDate = new Date(array.at(i)!.pub_date).getDate();
    const previousMessageDate = new Date(array.at(i - 1)!.pub_date).getDate();
    return currentMessageDate !== previousMessageDate;
  } else {
    return true;
  }
};

const containerStyle = {
  flexGrow: 1,
  overflow: "auto",
  p: 2,
  "&::-webkit-scrollbar": {
    alignSelf: "stretch",
    width: "4px",
  },
  "&::-webkit-scrollbar-track": {
    boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
  },
  "&::-webkit-scrollbar-thumb": {
    height: "212px",
    backgroundColor: "#98979A",
    outline: "1px solid slategrey",
    borderRadius: "100px",
  },
};

const Messages = () => {
  const { messages, lastMessagesPage, activeChat } = useAppSelector(
    (state) => state.chat
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetch = async () => {
      dispatch(resetMessages());
      await dispatch(getMessages());
    };

    if (activeChat) {
      fetch();
    }
  }, [dispatch, activeChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  const handleScroll = () => {
    if (messagesContainerRef.current) {
      const { scrollTop } = messagesContainerRef.current;
      if (scrollTop === 0) {
        if (!lastMessagesPage) {
          console.log("Достигнут верх контейнера!");
          dispatch(loadMoreMessages());
        }
      }
    }
  };

  return (
    <Box sx={containerStyle} ref={messagesContainerRef} onScroll={handleScroll}>
      {Object.values(messages).map((message, i, array) => (
        <Message
          key={message.id}
          message={message}
          first={checkIsFirstMessage(i, array)}
        />
      ))}
    </Box>
  );
};

export default Messages;
