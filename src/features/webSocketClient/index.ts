/* eslint-disable @typescript-eslint/no-unused-vars */

import { ISocketMessage } from "@/types";

enum SocketEvents {
  Open = "open",
  Close = "close",
  Message = "message",
  Error = "error",
}

export type SocketEvent = {
  data: string;
  type: string;
};

export class WebSocketClient {
  url!: string;
  socket: WebSocket | undefined;
  token: string | undefined;
  chatId: number | null = null;
  ping: number | undefined;
  signal?: AbortSignal;

  init(url: string) {
    this.url = url;
  }

  async connect() {
    // close previous connection
    await new Promise((resolve) => {
      setTimeout(() => {
        this.close();
        resolve(null);
      }, 10);
    });
    this.socket = new WebSocket(this.url);
    this.addListeners();
  }

  private socketOpen(_event: unknown) {}

  public socketMessage(_event: unknown) {}

  private socketError(_event: unknown) {}

  public socketClose(_event: unknown) {
    this.removeListeners && this.removeListeners();
  }

  private addListeners() {
    if (this.socket) {
      this.socket.addEventListener(SocketEvents.Open, this.socketOpen);
      this.socket.addEventListener(SocketEvents.Close, this.socketClose);
      this.socket.addEventListener(SocketEvents.Message, this.socketMessage);
      this.socket.addEventListener(SocketEvents.Error, this.socketError);
    }
  }
  private removeListeners() {
    if (this.socket) {
      this.socket.removeEventListener(SocketEvents.Open, this.socketOpen);
      this.socket.removeEventListener(SocketEvents.Close, this.socketClose);
      this.socket.removeEventListener(SocketEvents.Message, this.socketMessage);
      this.socket.removeEventListener(SocketEvents.Error, this.socketError);
    }
  }

  public close() {
    this.removeListeners();
    this.socket && this.socket.close();
  }

  sendMessage(message: ISocketMessage) {
    this.socket?.send(JSON.stringify(message));
  }
}
