import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { createWebSocket, closeWebSocket } from "@/redux/slices/chatSlice";
import { ISocketMessage } from "@/types";
import { useEffect } from "react";

export const useWebSocket = () => {
  const dispatch = useAppDispatch();
  const { webSocket } = useAppSelector((state) => state.chat);

  useEffect(() => {
    if (webSocket) {
      webSocket.socket?.addEventListener("close", () => {
        dispatch(closeWebSocket());
      });
    }
  }, [webSocket, dispatch]);

  const createSocket = (chatId: number) => {
    dispatch(createWebSocket(chatId));
  };

  const closeSocket = () => webSocket?.socket?.close();

  const sendMessage = (message: ISocketMessage) =>
    webSocket?.sendMessage(message);

  return { webSocket, sendMessage, createSocket, closeSocket };
};
