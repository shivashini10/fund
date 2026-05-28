import { io } from "socket.io-client";

let socket;

export const getSocket = () => {
  if (typeof window === "undefined") return null;

  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      transports: ["websocket"],
    });
  }

  return socket;
};