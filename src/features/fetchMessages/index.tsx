import { IMessage } from "@/types";
import { WebSocketClient, SocketEvent } from "@/features/webSocketClient";

interface FetchMessagesProp {
  page?: number;
  socket: WebSocketClient | null;
}

interface FetchMessages {
  (props: FetchMessagesProp): AsyncGenerator<
    IMessage | undefined,
    void,
    unknown
  >;
}

export const fetchMessages: FetchMessages = async function* ({
  socket,
  page = 1,
}) {
  if (socket) {
    const messages: IMessage[] = [];

    try {
      socket.socketMessage = (event: SocketEvent) => {
        const message = JSON.parse(event.data);
        messages.push(message);
      };

      if (page === 1) {
        socket.connect();
      } else {
        socket.sendMessage({ action: "load_more", page_number: page });
      }

      while (true) {
        if (messages.length > 0) {
          yield messages.shift();
        } else {
          await new Promise((resolve) => setTimeout(resolve, 50));
        }
      }
    } catch {
      socket.close();
    }
  }
};
