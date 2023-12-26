/* eslint-disable @typescript-eslint/ban-ts-comment */

import { tokenManager } from "@/api/api";

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
  socket: WebSocket | undefined;
  token: string | undefined;
  chatId: number | null = null;
  ping: number | undefined;

  async connect(chatId: number) {
    this.removeListeners();
    this.socket = new WebSocket(
      `ws://46.183.163.139/ws/chats/${chatId}/?token=${tokenManager.getToken()}`,
    );
    this.addListeners();
  }

  private socketOpen(event: unknown) {
    console.log("socket is open", event);
    // this.socket?.send(JSON.stringify({ "action": "load_more", page_number: 1 }))
  }

  public socketMessage(event: unknown) {
    //@ts-ignore
    const messages = JSON.parse(event.data);
    console.log("socket message", performance.now(), messages);
  }

  private socketError(event: unknown) {
    console.log("error", event);
    //console.log((event as SocketEvent).message);
  }

  private socketClose(event: unknown) {
    console.log("socket closed", event);
    this.removeListeners();
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
      this.socket.addEventListener(SocketEvents.Open, this.socketOpen);
      this.socket.addEventListener(SocketEvents.Close, this.socketClose);
      this.socket.addEventListener(SocketEvents.Message, this.socketMessage);
      this.socket.addEventListener(SocketEvents.Error, this.socketError);
    }
  }

  public close() {
    if (this.socket) {
      this.socket.close();
    }
  }

  sendMessage(message: string) {
    this.socket?.send(JSON.stringify({ message }));
  }
}
