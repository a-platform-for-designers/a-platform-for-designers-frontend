/* eslint-disable @typescript-eslint/no-unused-vars */
import { WS_URL } from "@/constants/constants";
import { SocketEvent, WebSocketClient } from "@/features/webSocketClient";
import { IMessage } from "@/types";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { useWebSocket } from "./useWebSocket";
/*
function cacheWrapper(targetFunction) {
  const cache = new Map();

  function wrapper(...args) {
    const cacheKey = JSON.stringify(args);

    if (cache.has(cacheKey)) {
      console.log("Результат взят из кэша");
      return cache.get(cacheKey);
    }

    const result = targetFunction(...args);
    cache.set(cacheKey, result);

    return result;
  }

  return wrapper;
}
*/

interface FetchMessagesProp {
  chatId?: number;
  page: number;
  signal?: AbortSignal;
  webSocket: WebSocketClient | null;
}

interface FetchMessages {
  (props: FetchMessagesProp): AsyncGenerator<
    IMessage | undefined,
    void,
    unknown
  >;
}

const originalFetchMessages: FetchMessages = async function* ({
  page,
  webSocket,
}) {
  if (webSocket) {
    const messages: IMessage[] = [];

    try {
      webSocket.socketMessage = (event: SocketEvent) => {
        console.log("webSocket", event);
        const message = JSON.parse(event.data);
        messages.push(message);
      };

      webSocket.connect();

      while (true) {
        if (messages.length > 0) {
          yield messages.shift();
        } else {
          await new Promise((resolve) => setTimeout(resolve, 50));
        }
      }
    } catch {
      webSocket.close();
    }
  }
};

interface UseFetchMessagesResult {
  loading: boolean;
  error: string | null;
  messages: Map<number, IMessage>;
  loadMore: () => void;
}

type UseFetchMessages = () => UseFetchMessagesResult;

const useFetchMessages: UseFetchMessages = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Map<number, IMessage>>(new Map());
  const { webSocket, createSocket, closeSocket } = useWebSocket();
  const { activeChat } = useAppSelector((state) => state.chat);

  useEffect(() => {
    setPage(1);
    setMessages(new Map());
    if (activeChat) {
      createSocket(activeChat.id);
    }
  }, [activeChat]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const messagesGenerator = originalFetchMessages({
          webSocket,
          page,
        });

        for await (const message of messagesGenerator) {
          setMessages((prevMessages) =>
            //ToDo сделать функционал не продуцирующий дубли, вызванные useStrict
            new Map(prevMessages).set(message!.id, message as IMessage)
          );
        }
      } catch (error: unknown) {
        webSocket?.close();
        setError((error as { message: string }).message);
      } finally {
        setLoading(false);
      }
    };

    if (webSocket) {
      fetchData();
    }

    return () => {
      closeSocket();
    };
  }, [page, webSocket]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return { loading, error, messages, loadMore };
};

export default useFetchMessages;
